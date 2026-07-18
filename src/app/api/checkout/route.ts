import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/data/products";
import { generateOrderNumber, formatPrice } from "@/lib/format";
import { sendEmail, storeEmail } from "@/lib/email";
import type { CustomerDetails, Order, OrderLine } from "@/lib/types";

interface CheckoutRequestBody {
  customer: CustomerDetails;
  lines: { productId: string; variantId: string; quantity: number }[];
}

function isNonEmptyString(value: unknown, maxLength = 200): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

function validateCustomer(customer: unknown): customer is CustomerDetails {
  if (!customer || typeof customer !== "object") return false;
  const c = customer as Record<string, unknown>;
  if (!isNonEmptyString(c.fullName, 100)) return false;
  if (!isNonEmptyString(c.address, 300)) return false;
  if (typeof c.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) return false;
  if (typeof c.phone !== "string" || !/^0\d{1,2}-?\d{6,7}$/.test(c.phone.replace(/\s/g, ""))) return false;
  return true;
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as CheckoutRequestBody | null;

  if (!body || !validateCustomer(body.customer)) {
    return NextResponse.json({ error: "פרטי לקוח לא תקינים" }, { status: 400 });
  }

  if (!Array.isArray(body.lines) || body.lines.length === 0) {
    return NextResponse.json({ error: "העגלה ריקה" }, { status: 400 });
  }

  const orderLines: OrderLine[] = [];

  for (const line of body.lines) {
    const product = getProductById(line?.productId);
    const variant = product?.variants.find((v) => v.id === line?.variantId);
    const quantity = Number(line?.quantity);

    if (!product || !variant || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return NextResponse.json({ error: "פריט בעגלה אינו תקין" }, { status: 400 });
    }

    orderLines.push({
      productId: product.id,
      productName: product.name,
      variantId: variant.id,
      variantName: variant.name,
      quantity,
      unitPrice: product.price + variant.priceDelta,
    });
  }

  const subtotal = orderLines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);

  const order: Order = {
    orderNumber: generateOrderNumber(),
    createdAt: new Date().toISOString(),
    status: "paid",
    customer: {
      fullName: body.customer.fullName.trim(),
      phone: body.customer.phone.trim(),
      email: body.customer.email.trim(),
      address: body.customer.address.trim(),
    },
    paymentMethod: "credit",
    shippingMethod: "instant",
    lines: orderLines,
    subtotal,
    discount: 0,
    total: subtotal,
  };

  const linesHtml = order.lines
    .map(
      (l) =>
        `<tr><td style="padding:6px 10px">${l.productName} (${l.variantName})</td><td style="padding:6px 10px">x${l.quantity}</td><td style="padding:6px 10px">${formatPrice(l.unitPrice * l.quantity)}</td></tr>`
    )
    .join("");

  await Promise.all([
    sendEmail({
      to: order.customer.email,
      subject: `אישור הזמנה #${order.orderNumber} - Digital Center`,
      html: `
        <div dir="rtl" style="font-family:Arial,sans-serif">
          <h2>תודה על ההזמנה, ${order.customer.fullName}!</h2>
          <p>מספר הזמנה: <strong>${order.orderNumber}</strong></p>
          <p>הגישה לקורסים שלכם זמינה באופן מיידי.</p>
          <table style="border-collapse:collapse;width:100%">${linesHtml}</table>
          <p style="margin-top:16px;font-weight:bold">סה"כ שולם: ${formatPrice(order.total)}</p>
        </div>
      `,
    }),
    sendEmail({
      to: storeEmail,
      subject: `הזמנה חדשה #${order.orderNumber}`,
      html: `
        <div dir="rtl" style="font-family:Arial,sans-serif">
          <h2>התקבלה הזמנה חדשה</h2>
          <p>${order.customer.fullName} | ${order.customer.phone} | ${order.customer.email}</p>
          <p>כתובת: ${order.customer.address}</p>
          <table style="border-collapse:collapse;width:100%">${linesHtml}</table>
          <p style="margin-top:16px;font-weight:bold">סה"כ: ${formatPrice(order.total)}</p>
        </div>
      `,
    }),
  ]);

  return NextResponse.json({ order });
}
