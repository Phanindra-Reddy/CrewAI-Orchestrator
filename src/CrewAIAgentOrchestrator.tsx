import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  PenTool,
  BookOpen,
  CheckCircle2,
  Mail,
  Send,
  Play,
  Trash2,
  Clock4,
  Settings,
  //ChevronRight,
  Copy,
  Download,
  ListTree,
  SlidersHorizontal,
  Loader2,
  BotMessageSquare,
} from "lucide-react";

// shadcn/ui components (assumed available in your project)
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
//import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
//import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
// import ChatContainer from "./ChatContainer";
// import { log } from "console";
import { Spinner } from "./components/ui/spinner";
import ReactMarkdown from "react-markdown";
import LoaderGrid from "./LoaderGrid";

/**
 * CrewAI Agent Orchestrator UI
 * ------------------------------------------------------
 * - Prompt input on the left, orchestration controls, email fields.
 * - "All Agents" vs "Specific Agents" radio.
 * - Sequential vs Parallel execution toggle.
 * - Results grid with per-agent cards (status, output, actions).
 * - Run history.
 * - All API calls are mocked; swap `runAgent` with your backend.
 */

const AGENTS = [
  {
    id: "researcher",
    name: "Researcher",
    icon: Search,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "writer",
    name: "Writer",
    icon: PenTool,
    gradient: "from-emerald-500 to-lime-500",
  },
  {
    id: "summarizer",
    name: "Summarizer",
    icon: BookOpen,
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    id: "reviewer",
    name: "Reviewer",
    icon: CheckCircle2,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "emailer",
    name: "Emailer",
    icon: Mail,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "delivery",
    name: "Email Delivery",
    icon: Send,
    gradient: "from-rose-500 to-red-500",
  },
] as const;

export type AgentId = (typeof AGENTS)[number]["id"];
export type AgentStatus = "idle" | "queued" | "running" | "done" | "error";
export interface AgentOutput {
  status: AgentStatus;
  output: {
    raw?: string;
    pydantic?: null;
    json_dict?: null;
    tasks_output?: null;
    agent?: string;
    output_format?: string;
    ms?: number;
    error?: string;
  };
  startedAt?: number;
  completedAt?: number;
  ms?: number;
  error?: string;
}

const prettyStatus: Record<AgentStatus, { label: string; color: string }> = {
  idle: { label: "Idle", color: "bg-muted text-muted-foreground" },
  queued: {
    label: "Queued",
    color: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  },
  running: { label: "Running", color: "bg-blue-600 text-white" },
  done: { label: "Done", color: "bg-emerald-600 text-white" },
  error: { label: "Error", color: "bg-rose-600 text-white" },
};

const defaultEmail = { to: "", subject: "", cc: "", bcc: "" };

export default function CrewAIAgentOrchestrator() {
  const [prompt, setPrompt] = useState("");
  const [orchestrate, setOrchestrate] = useState<
    "all" | "specific" | "orchestrator"
  >("all");
  const [selectedAgents, setSelectedAgents] = useState<
    Record<AgentId, boolean>
  >({
    researcher: true,
    writer: true,
    summarizer: true,
    reviewer: true,
    emailer: true,
    delivery: true,
  });

  const [orchestratorAgents, setOrchestratorAgents] = useState<
    Partial<Record<AgentId, boolean>>
  >({
    researcher: true,
    summarizer: true,
    emailer: true,
  });

  const [execution, setExecution] = useState<"sequential" | "parallel">(
    "sequential"
  );
  const [temperature, setTemperature] = useState(0.2);
  const [maxTokens, setMaxTokens] = useState(800);
  const [emailCfg, setEmailCfg] = useState(defaultEmail);

  const [outputs, setOutputs] = useState<Record<AgentId, AgentOutput>>({
    researcher: { status: "idle", output: { raw: "" } },
    writer: { status: "idle", output: { raw: "" } },
    summarizer: { status: "idle", output: { raw: "" } },
    reviewer: { status: "idle", output: { raw: "" } },
    emailer: { status: "idle", output: { raw: "" } },
    delivery: { status: "idle", output: { raw: "" } },
  });

  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState<any[]>([]);

  const activeAgents = useMemo<AgentId[]>(() => {
    if (orchestrate === "all") {
      return AGENTS.map((a) => a.id);
    } else if (orchestrate === "orchestrator") {
      return AGENTS.filter((a) =>
        ["researcher", "summarizer", "emailer"].includes(a.id)
      ).map((a) => a.id);
    }

    return AGENTS.filter((a) => selectedAgents[a.id]).map((a) => a.id);
  }, [orchestrate, selectedAgents]);

  useEffect(() => {
    // ensure all agent keys exist
    setOutputs((prev) => {
      const next = { ...prev };
      AGENTS.forEach((a) => {
        if (!next[a.id]) next[a.id] = { status: "idle", output: { raw: "" } };
      });
      return next;
    });
  }, []);

  function resetOutputs() {
    const next: Record<AgentId, AgentOutput> = {
      researcher: { status: "idle", output: { raw: "" } },
      writer: { status: "idle", output: { raw: "" } },
      summarizer: { status: "idle", output: { raw: "" } },
      reviewer: { status: "idle", output: { raw: "" } },
      emailer: { status: "idle", output: { raw: "" } },
      delivery: { status: "idle", output: { raw: "" } },
    };
    setOutputs(next);
    setIsCompleted(false);
    setProgress(0);
  }

  function handleToggleAgent(id: AgentId) {
    setSelectedAgents((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  async function runPipeline() {
    if (!prompt.trim()) {
      alert("Please enter a prompt first.");
      return;
    }

    setIsRunning(true);
    setIsCompleted(false);
    setProgress(2);

    // seed status
    setOutputs((prev) => {
      const next = { ...prev };
      for (const id of activeAgents)
        next[id] = { status: "queued", output: { raw: "" } };
      return next;
    });

    const started = Date.now();

    try {
      // if (execution === "sequential") {
      //   let completed = 0;
      //   for (const id of activeAgents) {
      //     await runAgent(id);
      //     completed += 1;
      //     setProgress(Math.round((completed / activeAgents.length) * 100));
      //   }
      // } else {
      //   let completed = 0;
      //   await Promise.all(
      //     activeAgents.map((id) =>
      //       runAgent(id).then(() => {
      //         completed += 1;
      //         setProgress(Math.round((completed / activeAgents.length) * 100));
      //       })
      //     )
      //   );
      // }

      await runAgent();

      const ended = Date.now();
      setHistory((h) => [
        {
          id: cryptoRandom(),
          timestamp: new Date().toISOString(),
          prompt,
          orchestrate,
          selected: activeAgents,
          execution,
          temperature,
          maxTokens,
          emailCfg,
          durationMs: ended - started,
        },
        ...h,
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunning(false);
      setIsCompleted(true);
      setProgress(100);
    }
  }

  /** Mock a backend call per agent. Swap this with your real API */
  async function runAgent() {
    setOutputs((prev) => {
      const now = Date.now();
      return Object.fromEntries(
        Object.keys(prev).map((key) => [
          key,
          { status: "running", startedAt: now, output: { raw: "" } },
        ])
      ) as Record<AgentId, AgentOutput>;
    });

    try {
      const res = await fetch(
        "https://inapposite-pamula-sailorly.ngrok-free.dev/v1/agents/run-orchestrator-multi22",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log("response", data);

      const nowCompleted = Date.now();

      // Update outputs with successful response
      setOutputs(
        (prev) =>
          Object.fromEntries(
            Object.keys(prev).map((agentId) => [
              agentId,
              {
                ...prev[agentId],
                status: "done",
                output:
                  data?.result?.message?.[
                    agentId.slice(0, 1).toUpperCase() + agentId.slice(1)
                  ] ?? prev[agentId]?.output,
                startedAt: prev[agentId]?.startedAt,
                completedAt: nowCompleted,
                ms: data.duration_ms,
              },
            ])
          ) as Record<AgentId, AgentOutput>
      );
    } catch (error: any) {
      const nowError = Date.now();

      // Update outputs with error for all agents
      setOutputs(
        (prev) =>
          Object.fromEntries(
            Object.keys(prev).map((agentId) => [
              agentId,
              {
                ...prev[agentId],
                status: "error",
                output: { error: error.message || "Something went wrong" },
                startedAt: prev[agentId]?.startedAt,
                completedAt: nowError,
              },
            ])
          ) as Record<AgentId, AgentOutput>
      );
    }

    // const res = await fetch(
    //   "https://inapposite-pamula-sailorly.ngrok-free.dev/v1/agents/run-orchestrator-multi",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       prompt,
    //     }),
    //   }
    // );

    // const data = await res.json();

    // console.log("response", data);

    // setOutputs((prev) => {
    //   const now = Date.now();

    //   return Object.fromEntries(
    //     Object.keys(prev).map((agentId) => [
    //       agentId,
    //       {
    //         ...prev[agentId],
    //         status: "done",
    //         output:
    //           data?.result?.message[
    //             agentId.slice(0, 1).toUpperCase() + agentId.slice(1)
    //           ] ?? prev[agentId]?.output,
    //         startedAt: prev[agentId]?.startedAt,
    //         completedAt: now,
    //         ms: data.duration_ms,
    //       },
    //     ])
    //   ) as Record<AgentId, AgentOutput>;
    // });
  }

  function copyText(txt: string) {
    navigator.clipboard.writeText(txt);
  }

  function downloadText(filename: string, content: string) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  const completionStats = useMemo(() => {
    const total = activeAgents.length || 1;
    const done = activeAgents.filter(
      (id) => outputs[id]?.status === "done"
    ).length;
    return { done, total };
  }, [outputs, activeAgents]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="border-b bg-background/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-md" />
            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                CrewAI Orchestrator
              </h1>
              <p className="text-xs text-muted-foreground -mt-0.5">
                Run Researcher, Writer, Summarizer, Reviewer & Email agents
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button size="sm" className="gap-2">
              <ListTree className="h-4 w-4" />
              API Docs
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-7xl max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 xl:grid-cols-3 gap-6 items-start xl:h-[calc(100vh-6rem)]">
        {/* Left column: Controls */}
        <div className="xl:col-span-1 space-y-6 xl:sticky xl:top-24 xl:self-start xl:max-h-[calc(100vh-8rem)] overflow-auto">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" /> Orchestration
              </CardTitle>
              <CardDescription>Choose how agents should run</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Prompt</Label>
                <Textarea
                  placeholder="Type the user request here (e.g., 'Draft a customer outreach email about our new CrewAI feature, then summarize.')"
                  value={prompt}
                  rows={6}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              {/* <div className="space-y-2">
                <Label>Agent Selection</Label>
                <RadioGroup
                  value={orchestrate}
                  onValueChange={(v) => setOrchestrate(v as any)}
                  className="grid sm:grid-cols-2 gap-2"
                >
                  <Label
                    className="flex items-center gap-2 border rounded-lg p-2 cursor-pointer"
                    htmlFor="all"
                  >
                    <RadioGroupItem id="all" value="all" className="mt-0.5" />{" "}
                    All Agents
                  </Label>
                  <Label
                    className="flex items-center gap-2 border rounded-lg p-2 cursor-pointer"
                    htmlFor="orchestrator"
                  >
                    <RadioGroupItem
                      id="orchestrator"
                      value="orchestrator"
                      className="mt-0.5"
                    />{" "}
                    Orchestrator
                  </Label>
                  <Label
                    className="flex items-center gap-2 border rounded-lg p-2 cursor-pointer"
                    htmlFor="specific"
                  >
                    <RadioGroupItem
                      id="specific"
                      value="specific"
                      className="mt-0.5"
                    />{" "}
                    Specific Agents
                  </Label>
                </RadioGroup>
              </div> */}

              {orchestrate === "specific" && (
                <div className="grid grid-cols-2 gap-3">
                  {AGENTS.map((a) => (
                    <label
                      key={a.id}
                      className={`flex items-center gap-2 border rounded-lg p-2 cursor-pointer hover:bg-accent/40 transition`}
                    >
                      <Switch
                        checked={!!selectedAgents[a.id]}
                        onCheckedChange={() => handleToggleAgent(a.id)}
                      />
                      <span className="text-sm">{a.name}</span>
                    </label>
                  ))}
                </div>
              )}

              <Separator className="my-2" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="my-2">
                  <Label>Execution</Label>
                  <RadioGroup
                    value={execution}
                    onValueChange={(v) => setExecution(v as any)}
                    className="grid grid-cols-1 gap-2 mt-2"
                  >
                    <Label
                      className="flex items-center gap-2 border rounded-lg p-2 cursor-pointer"
                      htmlFor="seq"
                    >
                      <RadioGroupItem
                        id="seq"
                        value="sequential"
                        className="mt-0.5"
                      />{" "}
                      Sequential
                    </Label>
                    <Label
                      className="flex items-center gap-2 border rounded-lg p-2 cursor-pointer"
                      htmlFor="par"
                    >
                      <RadioGroupItem
                        id="par"
                        value="parallel"
                        className="mt-0.5"
                      />{" "}
                      Parallel
                    </Label>
                  </RadioGroup>
                </div>
                <div className="space-y-2 my-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <Label>Temperature</Label>
                      <span className="text-xs text-muted-foreground">
                        {temperature.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={temperature}
                      onChange={(e) =>
                        setTemperature(parseFloat(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <Label>Max Tokens</Label>
                      <span className="text-xs text-muted-foreground">
                        {maxTokens}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={128}
                      max={4096}
                      step={64}
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              {/* Email settings (used by Emailer/Delivery) */}
              {/* <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <Label className="text-sm">
                    Email Settings (used if Emailer/Delivery selected)
                  </Label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Input
                    placeholder="To (comma separated)"
                    value={emailCfg.to}
                    onChange={(e) =>
                      setEmailCfg({ ...emailCfg, to: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Subject"
                    value={emailCfg.subject}
                    onChange={(e) =>
                      setEmailCfg({ ...emailCfg, subject: e.target.value })
                    }
                  />
                  <Input
                    placeholder="CC (optional)"
                    value={emailCfg.cc}
                    onChange={(e) =>
                      setEmailCfg({ ...emailCfg, cc: e.target.value })
                    }
                  />
                  <Input
                    placeholder="BCC (optional)"
                    value={emailCfg.bcc}
                    onChange={(e) =>
                      setEmailCfg({ ...emailCfg, bcc: e.target.value })
                    }
                  />
                </div>
              </div> */}

              <div className="flex items-center gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={resetOutputs}
                  disabled={isRunning}
                  className="gap-2 w-1/2 hover:cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear
                </Button>
                <Button
                  onClick={runPipeline}
                  disabled={isRunning}
                  className="gap-2 w-1/2 hover:cursor-pointer"
                >
                  {isRunning ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  {isRunning ? "Running…" : "Run Agents"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Run History */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock4 className="h-5 w-5" /> Run History
              </CardTitle>
              <CardDescription>Last 10 runs</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64 pr-2">
                {history.length === 0 && (
                  <p className="text-sm text-muted-foreground">No runs yet.</p>
                )}
                <div className="space-y-3">
                  {history.slice(0, 10).map((h) => (
                    <div
                      key={h.id}
                      className="p-3 rounded-lg border bg-background"
                    >
                      <div className="text-sm font-medium">
                        {new Date(h.timestamp).toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {h.prompt}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">
                          {h.orchestrate === "all" ? "All Agents" : "Specific"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {h.execution}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(h.durationMs / 1000)}s
                        </Badge>
                        {h.selected.map((id: string) => (
                          <Badge
                            key={id}
                            className="text-xs"
                            variant="secondary"
                          >
                            {AGENTS.find((a) => a.id === id)?.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Right column: Results */}
        <div className="relative xl:col-span-2 overflow-x-auto space-y-6 xl:overflow-y-auto xl:max-h-[calc(100vh-8rem)] h-full pr-2">
          {/* {isRunning && (
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Run Status
                    </CardTitle>
                    <CardDescription>
                      {completionStats.done}/{completionStats.total} agents
                      completed
                    </CardDescription>
                  </div>
                  <div className="w-56">
                    <Progress value={progress} />
                  </div>
                </div>
              </CardHeader>
            </Card>
          )} */}

          {isRunning ? (
            <>
              <div className="flex items-center gap-2">
                <Spinner />
                <p className="font-bold">Thinking....</p>
              </div>
              <LoaderGrid />
            </>
          ) : !isCompleted ? (
            <>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                <div className="w-20 h-20">
                  <BotMessageSquare size={80} />
                </div>
                <h3 className=" font-bold text-2xl mt-2">
                  How can I help you today?
                </h3>
                <small className="max-w-3xl text-slate-500 mt-2 text-center">
                  Run Agents by entering prompt and choose how agents should
                  run. <br />
                  Ex Prompt: Do reasearch on Gen AI and send mail to
                  hello@example.com
                </small>
              </div>
            </>
          ) : (
            <></>
          )}

          {isCompleted ? (
            <div className="grid grid-cols-1 gap-6 max-w-[1100px]">
              {AGENTS.map((a) => {
                const Icon = a.icon;
                const state = outputs[a.id] || {
                  status: "idle",
                  output: { raw: "" },
                };
                const status = prettyStatus[state.status as AgentStatus];

                const isActive =
                  orchestrate === "all" ||
                  (orchestrate === "orchestrator"
                    ? !!orchestratorAgents[a.id]
                    : !!selectedAgents[a.id]);

                return (
                  isActive &&
                  (state?.output?.raw || state?.output?.error) && (
                    <>
                      <motion.div
                        key={a.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        //className={`${isActive ? " " : "hidden"}`}
                      >
                        <Card
                          // className={`overflow-hidden border-2 ${
                          //   isActive ? "" : "opacity-50"
                          // }`}
                          className="overflow-hidden border-2"
                        >
                          <div
                            className={`h-1.5 bg-gradient-to-r ${
                              state.status === "done"
                                ? "from-emerald-500 to-lime-500"
                                : state.status === "running"
                                ? "from-blue-500 to-cyan-500"
                                : "from-slate-200 to-slate-200 dark:from-slate-800 dark:to-slate-800"
                            }`}
                          ></div>
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`h-10 w-10 rounded-xl bg-gradient-to-br ${a.gradient} grid place-items-center text-white shadow`}
                                >
                                  <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <CardTitle>{a.name}</CardTitle>
                                  <CardDescription className="flex items-center gap-2">
                                    <Badge
                                      className={`${status.color} capitalize`}
                                    >
                                      {status.label}
                                    </Badge>
                                    {state.ms ? (
                                      <span className="text-xs text-muted-foreground">
                                        {state.ms} ms
                                      </span>
                                    ) : null}
                                  </CardDescription>
                                </div>
                              </div>
                              <TooltipProvider>
                                <div className="flex items-center gap-1">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => {
                                          copyText(state?.output?.raw);
                                          toast("Content copied successfully.");
                                        }}
                                        disabled={!state.output}
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Copy</TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() =>
                                          downloadText(
                                            `${a.id}.txt`,
                                            state?.output?.raw
                                          )
                                        }
                                        disabled={!state.output}
                                      >
                                        <Download className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Download</TooltipContent>
                                  </Tooltip>
                                </div>
                              </TooltipProvider>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="rounded-lg border bg-muted/40 p-3 min-h-[120px] max-h-[240px] text-sm overflow-x-auto">
                              {state.status === "running" && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Generating…
                                </div>
                              )}
                              {state.status === "idle" && (
                                <span className="text-muted-foreground">
                                  Waiting to run…
                                </span>
                              )}

                              {state.output?.raw && (
                                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                                  <ReactMarkdown>
                                    {state.output.raw}
                                  </ReactMarkdown>
                                </div>
                              )}

                              {state.output?.error && (
                                <div className="text-sm text-red-500 whitespace-pre-wrap">
                                  Error: {state.output.error}
                                </div>
                              )}
                            </div>
                            {a.id === "delivery" && (
                              <p className="mt-2 text-xs text-muted-foreground">
                                Note: Connect your SMTP credentials in the
                                backend. This card displays the delivery
                                log/result.
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    </>
                  )
                );
              })}
            </div>
          ) : (
            <></>
          )}

          {/* Integration notes */}
          {/* <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChevronRight className="h-5 w-5" /> Hooking up your backend
              </CardTitle>
              <CardDescription>
                Replace the mocked `runAgent` with your real CrewAI endpoints.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="rounded-lg bg-muted p-3 overflow-x-auto text-xs">{`// Example: call your API per agent
async function runAgent(agentId) {
  setOutputs(prev => ({ ...prev, [agentId]: { ...prev[agentId], status: 'running', startedAt: Date.now() }}));
  const res = await fetch('/api/crew/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      agent: agentId,
      execution,
      temperature,
      maxTokens,
      email: emailCfg,
    })
  });
  const data = await res.json();
  setOutputs(prev => ({ ...prev, [agentId]: { status: 'done', output: data.output, startedAt: prev[agentId]?.startedAt, completedAt: Date.now(), ms: data.latencyMs }}));
}`}</pre>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------
// Utilities
// ------------------------------------------------------

// function wait(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

function cryptoRandom() {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const a = new Uint32Array(2);
    (crypto as any).getRandomValues(a);
    return `${a[0].toString(16)}${a[1].toString(16)}`;
  }
  return Math.random().toString(16).slice(2);
}
