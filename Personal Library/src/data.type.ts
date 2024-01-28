export interface book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  rating: number;
  notes: string | null;
}

export interface genre {
  id: number;
  name: string;
}
