import { BattleChallenge, FeatureItem, LanguageOption, ProgrammingLanguage, StatItem } from '../types';

export const LANGUAGES: LanguageOption[] = [
  { id: 'javascript', name: 'JavaScript', extension: 'js', color: '#f7df1e' },
  { id: 'typescript', name: 'TypeScript', extension: 'ts', color: '#3178c6' },
  { id: 'python', name: 'Python', extension: 'py', color: '#3776ab' },
  { id: 'rust', name: 'Rust', extension: 'rs', color: '#dea584' },
  { id: 'cpp', name: 'C++', extension: 'cpp', color: '#00599c' },
  { id: 'go', name: 'Go', extension: 'go', color: '#00add8' },
];

export const HERO_CODE_SNIPPETS: Record<ProgrammingLanguage, string> = {
  javascript: `function solve(numbers) {
    return numbers
        .filter(n => n % 2 === 0)
        .map(n => n * 2);
}`,
  typescript: `function solve(numbers: number[]): number[] {
    return numbers
        .filter((n: number) => n % 2 === 0)
        .map((n: number) => n * 2);
}`,
  python: `def solve(numbers: list[int]) -> list[int]:
    # Filter even numbers and double their values
    return [n * 2 for n in numbers if n % 2 == 0]`,
  rust: `pub fn solve(numbers: &[i32]) -> Vec<i32> {
    numbers
        .iter()
        .filter(|&&n| n % 2 == 0)
        .map(|&n| n * 2)
        .collect()
}`,
  cpp: `std::vector<int> solve(const std::vector<int>& numbers) {
    std::vector<int> result;
    for (int n : numbers) {
        if (n % 2 == 0) result.push_back(n * 2);
    }
    return result;
}`,
  go: `func solve(numbers []int) []int {
    var result []int
    for _, n := range numbers {
        if n%2 == 0 {
            result = append(result, n*2)
        }
    }
    return result
}`,
};

export const HERO_TEST_RESULTS = [
  { id: 1, name: 'even_doubler_basic', input: '[1, 2, 3, 4]', output: '[4, 8]', status: 'passed', time: '1.8ms' },
  { id: 2, name: 'mixed_negative_integers', input: '[-4, -3, 0, 7]', output: '[-8, 0]', status: 'passed', time: '0.9ms' },
  { id: 3, name: 'empty_and_odd_arrays', input: '[1, 3, 5, 7, 9]', output: '[]', status: 'passed', time: '0.6ms' },
];

export const STATS_ITEMS: StatItem[] = [
  {
    id: 'devs',
    value: '10K+',
    label: 'Developers',
    subtext: 'Competing actively from 140+ countries',
    accent: 'cyan',
  },
  {
    id: 'battles',
    value: '50K+',
    label: 'Battles',
    subtext: '1v1 duels, room matches & live tourneys',
    accent: 'purple',
  },
  {
    id: 'problems',
    value: '100K+',
    label: 'Problems Solved',
    subtext: 'Curated algorithms from easy to grandmaster',
    accent: 'emerald',
  },
  {
    id: 'uptime',
    value: '99.9%',
    label: 'Uptime',
    subtext: 'Ultra-low latency real-time WebSocket mesh',
    accent: 'blue',
  },
];

export const FEATURES: FeatureItem[] = [
  {
    id: 'realtime-battles',
    number: '01',
    title: 'Real-Time Battles',
    description: 'Face off 1v1 against programmers worldwide in adrenaline-pumping algorithmic showdowns with sub-20ms syncing.',
    tag: 'Ultra-Low Latency',
    iconName: 'Zap',
    detail: 'Instant matchmaking pair algorithms by TrueSkill rating in under 3 seconds.',
  },
  {
    id: 'multiplayer-rooms',
    number: '02',
    title: 'Multiplayer Rooms',
    description: 'Host private showdowns with teammates, organize college hack-duels, or launch custom room brackets up to 64 devs.',
    tag: 'Custom Lobbies',
    iconName: 'Users',
    detail: 'Configurable time limits, penalty systems, and custom curated problem sets.',
  },
  {
    id: 'live-code-editor',
    number: '03',
    title: 'Live Code Editor',
    description: 'Lightning-fast cloud editor with instant syntax highlighting, intelligent autocomplete, vim mode, and multi-cursor.',
    tag: 'Monaco Engine',
    iconName: 'Code2',
    detail: 'Zero setup required. Run against test suites in an isolated microVM sandbox.',
  },
  {
    id: 'global-leaderboard',
    number: '04',
    title: 'Global Leaderboard',
    description: 'Climb from Novice to Grandmaster tier. Track your worldwide rank, country standing, and specialty badges.',
    tag: 'ELO Ranking',
    iconName: 'Trophy',
    detail: 'Weekly tournaments, seasonal resets, and verifiable on-chain developer trophies.',
  },
  {
    id: 'performance-statistics',
    number: '05',
    title: 'Performance Statistics',
    description: 'Deep analytics covering your runtime speed, memory consumption, algorithmic weak spots, and battle win rates.',
    tag: 'Deep Insights',
    iconName: 'BarChart3',
    detail: 'Interactive execution graphs comparing your solution with the top 1% percentiles.',
  },
  {
    id: 'multiple-languages',
    number: '06',
    title: 'Multiple Programming Languages',
    description: 'Compete in Python, TypeScript, JavaScript, Rust, C++, or Go. Our cross-language engine normalizes execution metrics fairly.',
    tag: '6+ Compilers',
    iconName: 'Globe',
    detail: 'Latest stable compiler versions with standardized time and memory allocations.',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Create or Join',
    headline: 'Enter the arena in seconds',
    description: 'Create a battle room or enter a room code. Jump into ranked quick match or invite friends to a private duel.',
    badge: 'Step 1: Matchmaking',
    codeSnippet: `// Quick Match Request
const battle = await codeBattle.join({
  mode: "ranked-1v1",
  tier: "Grandmaster",
  language: "typescript"
});`,
  },
  {
    step: '02',
    title: 'Solve',
    headline: 'Race against time and opponents',
    description: 'Race against other developers and solve the challenge. Watch opponent progress bars update keystroke by keystroke.',
    badge: 'Step 2: Real-time Arena',
    codeSnippet: `// Live Arena Stream
arena.on("opponent_progress", (data) => {
  console.log(\`\${data.user} passed test \${data.passed}/\${data.total}\`);
  // Speed factor: +15% XP multiplier for first solve
});`,
  },
  {
    step: '03',
    title: 'Win',
    headline: 'Climb the global ranks',
    description: 'Earn XP, climb the leaderboard and improve your skills. Unlock rare badges, analyze post-match stats, and level up.',
    badge: 'Step 3: Victory & ELO',
    codeSnippet: `// Battle Result
{
  result: "VICTORY",
  eloChange: "+32 (Current: 2,512)",
  xpEarned: "+250 XP",
  accuracy: "98.4%",
  executionTime: "4.2ms"
}`,
  },
];

export const BATTLE_PREVIEW_CHALLENGE: BattleChallenge = {
  id: 'chal-subarray',
  title: 'Maximum Subarray Alternating Product',
  difficulty: 'Medium',
  category: 'Dynamic Programming · Arrays',
  timeLimitSeconds: 600,
  description: 'Given an array of integers nums, find the contiguous subarray that has the largest alternating parity product and return its maximum value.',
  starterCode: {
    javascript: `function maxAlternatingProduct(nums) {
  let maxProduct = nums[0];
  let curr = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    if ((nums[i] % 2 === 0) !== (nums[i-1] % 2 === 0)) {
      curr = Math.max(nums[i], curr * nums[i]);
    } else {
      curr = nums[i];
    }
    maxProduct = Math.max(maxProduct, curr);
  }
  return maxProduct;
}`,
    typescript: `function maxAlternatingProduct(nums: number[]): number {
  let maxProduct = nums[0];
  let curr = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    const isAlt = (nums[i] % 2 === 0) !== (nums[i-1] % 2 === 0);
    curr = isAlt ? Math.max(nums[i], curr * nums[i]) : nums[i];
    maxProduct = Math.max(maxProduct, curr);
  }
  return maxProduct;
}`,
    python: `def max_alternating_product(nums: list[int]) -> int:
    max_prod = curr = nums[0]
    for i in range(1, len(nums)):
        is_alt = (nums[i] % 2 == 0) != (nums[i-1] % 2 == 0)
        curr = max(nums[i], curr * nums[i]) if is_alt else nums[i]
        max_prod = max(max_prod, curr)
    return max_prod`,
    rust: `pub fn max_alternating_product(nums: &[i32]) -> i32 {
    let mut max_prod = nums[0];
    let mut curr = nums[0];
    for i in 1..nums.len() {
        let is_alt = (nums[i] % 2 == 0) != (nums[i-1] % 2 == 0);
        curr = if is_alt { curr.max(curr * nums[i]) } else { nums[i] };
        max_prod = max_prod.max(curr);
    }
    max_prod
}`,
    cpp: `int maxAlternatingProduct(const std::vector<int>& nums) {
    int maxProduct = nums[0], curr = nums[0];
    for (size_t i = 1; i < nums.size(); ++i) {
        bool isAlt = (nums[i] % 2 == 0) != (nums[i-1] % 2 == 0);
        curr = isAlt ? std::max(nums[i], curr * nums[i]) : nums[i];
        maxProduct = std::max(maxProduct, curr);
    }
    return maxProduct;
}`,
    go: `func maxAlternatingProduct(nums []int) int {
    maxProduct, curr := nums[0], nums[0]
    for i := 1; i < len(nums); i++ {
        isAlt := (nums[i]%2 == 0) != (nums[i-1]%2 == 0)
        if isAlt && curr*nums[i] > nums[i] {
            curr = curr * nums[i]
        } else {
            curr = nums[i]
        }
        if curr > maxProduct {
            maxProduct = curr
        }
    }
    return maxProduct
}`,
  },
  testCases: [
    { id: 1, input: '[2, 3, 2, 5]', expected: '60', passed: true, runtimeMs: 1.2 },
    { id: 2, input: '[-2, 3, -4, 5]', expected: '120', passed: true, runtimeMs: 0.8 },
    { id: 3, input: '[1, 3, 5, 7]', expected: '7', passed: true, runtimeMs: 0.5 },
    { id: 4, input: '[4, -2, 6, 8]', expected: '8', passed: true, runtimeMs: 1.4 },
    { id: 5, input: '[10, 5, 2, 7, 4]', expected: '2800', passed: false, runtimeMs: 2.1 },
  ],
};

export const LEADERBOARD_PREVIEW = [
  { rank: 1, name: 'quantum_coder', country: 'SG', rating: 2894, winRate: '88.4%', badge: 'Grandmaster' },
  { rank: 2, name: 'sarah_codes', country: 'US', rating: 2780, winRate: '84.1%', badge: 'Master' },
  { rank: 3, name: 'alex_dev', country: 'DE', rating: 2645, winRate: '79.6%', badge: 'Master' },
  { rank: 4, name: 'hacker_x', country: 'JP', rating: 2590, winRate: '76.8%', badge: 'Diamond' },
  { rank: 5, name: 'binary_beast', country: 'CA', rating: 2540, winRate: '75.2%', badge: 'Diamond' },
];
