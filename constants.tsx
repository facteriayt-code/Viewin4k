
import { Movie } from './types';

export const INITIAL_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Interstellar Voyager',
    description: 'A team of explorers travel beyond this galaxy to discover whether mankind has a future among the stars.',
    thumbnail: 'https://picsum.photos/seed/interstellar/800/450',
    category: 'Sci-Fi',
    rating: 'PG-13',
    year: '2024'
  },
  {
    id: '2',
    title: 'Neon Nights',
    description: 'In a dystopian future, a small-time hacker uncovers a massive corporate conspiracy that could change everything.',
    thumbnail: 'https://picsum.photos/seed/neon/800/450',
    category: 'Action',
    rating: 'R',
    year: '2023'
  },
  {
    id: '3',
    title: 'The Silent Forest',
    description: 'A biologist studying rare plant life in a remote forest discovers a secret that the local legends warned about.',
    thumbnail: 'https://picsum.photos/seed/forest/800/450',
    category: 'Trending',
    rating: '12+',
    year: '2024'
  },
  {
    id: '4',
    title: 'Midnight Heist',
    description: 'A master thief is pulled out of retirement for one last job: stealing an impossible treasure from a high-security vault.',
    thumbnail: 'https://picsum.photos/seed/heist/800/450',
    category: 'Popular',
    rating: 'PG-13',
    year: '2023'
  },
  {
    id: '5',
    title: 'Ocean Deep',
    description: 'An underwater expedition goes wrong when the crew discovers something ancient and alive at the bottom of the Mariana Trench.',
    thumbnail: 'https://picsum.photos/seed/ocean/800/450',
    category: 'Sci-Fi',
    rating: 'R',
    year: '2024'
  },
  {
    id: '6',
    title: 'Echoes of Time',
    description: 'A scientist discovers a way to send messages to the past, but every message changes the future in unpredictable ways.',
    thumbnail: 'https://picsum.photos/seed/time/800/450',
    category: 'Popular',
    rating: 'PG-13',
    year: '2022'
  }
];

export const CATEGORIES: string[] = ['Trending', 'Popular', 'Action', 'Sci-Fi', 'My Uploads'];
