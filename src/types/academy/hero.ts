export interface Hero {
  title: string;
  description: string;
  first_link: {
    title: string;
    url: string;
  };
  second_link: {
    title: string;
    url: string;
  };
  image: string;
}

export interface HeroResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: Hero;
  path: string | null;
  timestamp: string;
}

export interface HeroPayload {
  title: string;
  image?: File;
  description: string;
  first_link_title: string;
  first_link_url: string;
  second_link_title: string;
  second_link_url: string;
}
