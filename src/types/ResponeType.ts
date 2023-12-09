import { UserType } from "./UserType";

export type ResponseType = {
  success: boolean,
  page: number,
  total_pages: number,
  total_users: number,
  count: number,
  links: {
    next_url: string | null,
    prev_url: string | null,
  },
  users: UserType[],
}