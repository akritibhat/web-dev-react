
const TOPIC_API_URL =
    'https://hw1akriti.herokuapp.com/api/lesson/LID/topic';

const TOPIC_CHG_URL =
    'https://hw1akriti.herokuapp.com/api/topic';

let _singleton = Symbol();
export default class TopicService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new TopicService(_singleton);
        return this[_singleton]
    }

    findAllTopicsForLesson(lessonID) {
        return fetch(
            TOPIC_API_URL
                .replace('LID', lessonID))
            .then(function (response) {
                return response.json();
            })
    }

    createTopic( lessonID, topic) {
        return fetch(TOPIC_API_URL.replace('LID', lessonID),
            {
                body: JSON.stringify(topic),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    updateTopic(topicId,topic) {
        return fetch(TOPIC_CHG_URL + '/' + topicId, {
            body: JSON.stringify(topic),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        }).then(function (response) {
            return response.json();
        })}

    deleteTopic(topicId){
        return fetch(TOPIC_CHG_URL + '/' + topicId, {
            method: 'delete'
        })
            .then(function(response){
                return response;
            })
    }
}
