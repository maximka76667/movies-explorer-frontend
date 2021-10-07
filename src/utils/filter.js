import { SHORT_DURATION } from '../config';

export default function filter(cardList, searchValue, isShort) {
    const regExp = new RegExp(searchValue.toLowerCase());
    const filteredMovies = cardList
        .filter((movie) => regExp.test(movie.nameRU.toLowerCase()))
        .filter((m) => isShort ? m.duration <= SHORT_DURATION : m.duration > SHORT_DURATION)
    return filteredMovies;
}