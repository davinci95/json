
var courseApi = 'http://localhost:3000/courses';

function start() {
    getCourses(renderCourse);
    handleCreateForm()
}

start();


//  GET
function getCourses(callback) {
    fetch(courseApi)
        .then(function(response) {
            return response.json()
        })
        .then(callback);
};

// POST
function createCourses(data, callback) {
  var option = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(data)
  }

  fetch(courseApi, option)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

// render
function renderCourse(courses) {
    var listCoursesBlock = 
        document.querySelector('#list-courses');
    var htmls = courses.map(function(course) {
        return `
            <li>
                <h4>${course.name}</h4>
                <p>${course.description}</p>
            </li>`;
    });

    listCoursesBlock.innerHTML = htmls.join('');
}; 

// create
function handleCreateForm() {
    var createBtn = 
        document.querySelector('#create');
    createBtn.onclick = function() {
        var name = 
            document.querySelector('input[name="name"]').value;
        var description = 
            document.querySelector('input[name="description"]').value;
    var formData = {
        name: name,
        description: description
    };      
    createCourses(formData, function() {
        getCourses(renderCourse);
    });  
    }    
}