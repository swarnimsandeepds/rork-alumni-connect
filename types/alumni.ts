export interface Alumni {
  id: string;
  name: string;
  graduationYear: number;
  major: string;
  currentPosition: string;
  company: string;
  location: string;
  industry: string;
  bio: string;
  email: string;
  linkedin?: string;
  profileImage: string;
  skills: string[];
}

export interface AlumniFilters {
  search: string;
  graduationYear: string;
  industry: string;
  location: string;
}
