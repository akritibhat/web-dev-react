import CourseService from "./CourseService";

const MODULE_API_URL =
  'http://localhost:8080/api/course/CID/module';

const MODULE_DELETE_URL =
    'http://localhost:8080/api/module';


let _singleton = Symbol();
export default class ModuleService {
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Singleton!!!');
  }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }

  findAllModulesForCourse(courseId) {
    return fetch(
      MODULE_API_URL
        .replace('CID', courseId))
      .then(function (response) {
        return response.json();
      })
  }

  createModule(courseId, module) {
    return fetch(MODULE_API_URL.replace('CID', courseId),
      {
        body: JSON.stringify(module),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }).then(function (response)
    { return response.json(); })
  }

    deleteModule(moduleId) {
        return fetch(MODULE_DELETE_URL + '/' + moduleId, {
            method: 'delete'
        })
            .then(function(response){
                return response;
            });
    }

    updateModule(moduleId,module) {
        return fetch(MODULE_DELETE_URL + '/' + moduleId, {
            body: JSON.stringify(module),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        }).then(function (response) {
            return response.json();
        })}

}
