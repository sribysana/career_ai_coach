// Phase 0 scaffolding placeholder — interface shell only.
// Implementations (e.g. the Claude adapter) land in Phase 2 (specs/roadmap.md).
export interface CoachAI {
  ask(prompt: string): Promise<string>;
}
