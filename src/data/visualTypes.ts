export type VisualSpec =
  | { type: "steps"; steps: { label: string; description: string }[] }
  | { type: "compare"; leftLabel: string; leftItems: string[]; rightLabel: string; rightItems: string[] }
  | { type: "funnel"; stages: { label: string; value: string }[] }
  | { type: "tree"; root: string; branches: { label: string; children?: string[] }[] }
  | { type: "metrics"; unit: string; bars: { label: string; value: number }[] }
  | { type: "mockup"; kind: "chat" | "feed" | "timeline" | "dashboard"; blocks: string[] };
