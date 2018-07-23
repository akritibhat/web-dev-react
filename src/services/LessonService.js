
const LESSON_API_URL =
    'http://localhost:8080/api/course/CID/module/MID/lesson';

const LESSON_CHG_URL =
    'http://localhost:8080/api/lesson';

let _singleton = Symbol();
export default class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllLessonsForModule(courseID,moduleID) {
        return fetch(
            LESSON_API_URL
                .replace('MID', moduleID).replace('CID',courseID))
            .then(function (response) {
                return response.json();
            })
    }

    createLesson( courseID, moduleID, lesson) {
        return fetch(
            LESSON_API_URL
            .replace('MID', moduleID).replace('CID',courseID),
            {
                body: JSON.stringify(lesson),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteLesson(lessonId){
        return fetch(LESSON_CHG_URL + '/' + lessonId, {
            method: 'delete'
        })
            .then(function(response){
                return response;
            })
    }

    updateLesson(lessonId,lesson) {
        return fetch(LESSON_CHG_URL + '/' + lessonId, {
            body: JSON.stringify(lesson),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        }).then(function (response) {
            return response.json();
        })}

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }
}
