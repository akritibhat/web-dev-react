
const LESSON_API_URL =
    'http://localhost:8080/api/module/lessons/MID';

let _singleton = Symbol();
export default class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllLessonsForModule(moduleID) {
        return fetch(
            LESSON_API_URL
                .replace('MID', moduleID))
            .then(function (response) {
                return response.json();
            })
    }

    createLesson( moduleID, lesson) {
        return fetch(LESSON_API_URL.replace('MID', moduleID),
            {
                body: JSON.stringify(lesson),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }
}
