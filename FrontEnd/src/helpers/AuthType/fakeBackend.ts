import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as url from "../url_helper";

let users = [
  {
    uid: 1,
    username: "admin",
    role: "admin",
    password: "123456",
    email: "admin@themesbrand.com",
  },
];

const fakeBackend = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

  mock.onPost("/post-jwt-register").reply((config: any) => {
    const user = JSON.parse(config["data"]);
    users.push(user);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });

  mock.onPost(url.ADD_NEW_EVENT).reply((event) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot add event"]);
        }
      });
    });
  });

  // crm companies

  mock.onPost(url.ADD_NEW_COMPANIES).reply((company) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (company && company.data) {
          // Passing fake JSON data as response
          resolve([200, company.data]);
        } else {
          reject([400, "Cannot add company"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_EVENT).reply((event) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_EVENT).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.event]);
        } else {
          reject([400, "Cannot delete event"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_MESSAGE).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config.data) {
          // Passing fake JSON data as response
          resolve([200, config.data]);
        } else {
          reject([400, "Cannot add message"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_MESSAGE).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.message]);
        } else {
          reject([400, "Cannot delete message"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_MAIL).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.forId]);
        } else {
          reject([400, "Cannot delete order"]);
        }
      });
    });
  });

  mock.onDelete(url.UNREAD_MAIL).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.forId]);
        } else {
          reject([400, "Cannot Stared Mail"]);
        }
      });
    });
  });

  mock.onDelete(url.STARED_MAIL).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.forId]);
        } else {
          reject([400, "Cannot Stared Mail"]);
        }
      });
    });
  });

  mock.onDelete(url.LABEL_MAIL).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.forId]);
        } else {
          reject([400, "Try Sometime Later"]);
        }
      });
    });
  });

  mock.onDelete(url.TRASH_MAIL).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.forId]);
        } else {
          reject([400, "Cannot Trash Mail"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_PROJECT).reply((project) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (project && project.data) {
          // Passing fake JSON data as response
          resolve([200, project.data]);
        } else {
          reject([400, "Cannot add project"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_PROJECT).reply((project) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (project && project.data) {
          // Passing fake JSON data as response
          resolve([200, project.data]);
        } else {
          reject([400, "Cannot update project"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_PROJECT).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.project]);
        } else {
          reject([400, "Cannot delete event"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_TEAMDATA).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.team]);
        } else {
          reject([400, "Cannot delete team data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_TEAMDATA).reply((team) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (team && team.data) {
          // Passing fake JSON data as response
          resolve([200, team.data]);
        } else {
          reject([400, "Cannot add team data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_TEAMDATA).reply((team) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (team && team.data) {
          // Passing fake JSON data as response
          resolve([200, team.data]);
        } else {
          reject([400, "Cannot update team data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_PRODUCT).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot add event"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_PRODUCT).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_PRODUCT).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_PRODUCT).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          resolve([200, config.headers.data]);
        } else {
          reject([400, "Cannot delete event"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_ORDER).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_ORDER).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_ORDER).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_ORDER).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_CUSTOMER).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_CUSTOMER).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_CUSTOMER).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_CUSTOMER).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_TASK).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_TASK).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_TASK).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_TASK).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_TASKS).reply((user) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.data) {
          // Passing fake JSON data as response
          resolve([200, user.data]);
        } else {
          reject([400, "Cannot add user"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_TASKS).reply((user) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.data) {
          // Passing fake JSON data as response
          resolve([200, user.data]);
        } else {
          reject([400, "Cannot update user"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_TASKS).reply((config) => {
    console.log("config", config);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.card]);
        } else {
          reject([400, "Cannot delete users"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_TICKET).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_TICKET).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_TICKET).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_TICKET).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_CANDIDATE).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_CANDIDATE).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_CANDIDATE).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_CANDIDATE_GRID).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_CATEGORY_LIST).reply((project) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (project && project.data) {
          // Passing fake JSON data as response
          resolve([200, project.data]);
        } else {
          reject([400, "Cannot add Project data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_CONTACT).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_CONTACT).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_CONTACT).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_CONTACT).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_COMPANIES).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_COMPANIES).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_COMPANIES).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_COMPANIES).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_LEAD).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_LEAD).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_LEAD).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_LEAD).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_FOLDER).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.folder]);
        } else {
          reject([400, "Cannot delete folder data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_FOLDER).reply((folder) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (folder && folder.data) {
          // Passing fake JSON data as response
          resolve([200, folder.data]);
        } else {
          reject([400, "Cannot add folder data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_FOLDER).reply((folder) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (folder && folder.data) {
          // Passing fake JSON data as response
          resolve([200, folder.data]);
        } else {
          reject([400, "Cannot update folder data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_FILE).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_FILE).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_FILE).reply((file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_TODO).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.todo]);
        } else {
          reject([400, "Cannot delete To do data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_TODO).reply((todo) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (todo && todo.data) {
          // Passing fake JSON data as response
          resolve([200, todo.data]);
        } else {
          reject([400, "Cannot add To do data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_TODO).reply((todo) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (todo && todo.data) {
          // Passing fake JSON data as response
          resolve([200, todo.data]);
        } else {
          reject([400, "Cannot update To do data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_TODO_PROJECT).reply((project) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (project && project.data) {
          // Passing fake JSON data as response
          resolve([200, project.data]);
        } else {
          reject([400, "Cannot add Project data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_APPLICATION_LIST).reply((job) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (job && job.data) {
          // Passing fake JSON data as response
          resolve([200, job.data]);
        } else {
          reject([400, "Cannot add Job Application data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_APPLICATION_LIST).reply((job) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (job && job.data) {
          // Passing fake JSON data as response
          resolve([200, job.data]);
        } else {
          reject([400, "Cannot update Job Application data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_APPLICATION_LIST).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.job]);
        } else {
          reject([400, "Cannot delete Job Application data"]);
        }
      });
    });
  });

  // Invoice
  mock.onDelete(url.DELETE_INVOICE).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          resolve([200, config.headers.invoice]);
        } else {
          reject([400, "Cannot delete event"]);
        }
      });
    });
  });
};

export default fakeBackend;
