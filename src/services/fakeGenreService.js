export const Genres = [
  { _id: "1111005", name: "Action" },
  { _id: "1111009", name: "Comedy" },
  { _id: "1111007", name: "Thriller" },
];
export default function getAllGenres() {
  return Genres.filter((g) => g);
}
// export Genres;
