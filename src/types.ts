export type ProgrammingLanguage = 'javascript' | 'typescript' | 'python' | 'rust' | 'cpp' | 'go';

export interface LanguageOption {
  id: ProgrammingLanguage;
  name: string;
  extension: string;
  color: string;
}

export interface Player {
  id: string;
  username: string;
  avatar: string;
  rating: number;
  rankTitle: string;
  testsPassed: number;
  totalTests: number;
  isReady: boolean;
  score: number;
  status: 'typing' | 'running' | 'idle' | 'submitted';
}

export interface TestCase {
  id: number;
  input: string;
  expected: string;
  passed?: boolean;
  runtimeMs?: number;
}

export interface BattleChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  timeLimitSeconds: number;
  description: string;
  starterCode: Record<ProgrammingLanguage, string>;
  testCases: TestCase[];
}

export interface FeatureItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tag: string;
  iconName: string;
  detail: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  subtext: string;
  accent: 'cyan' | 'purple' | 'emerald' | 'blue';
}
