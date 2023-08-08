let users = [];

const renderUsers = function () {
  const usersDiv = document.querySelector('.users');

  usersDiv.replaceChildren();

  users.forEach((user) => {
    const template = `
    <div class="user col-md-4 text-center">
      <div class="user-inner">
        <h4>Login: ${ user.login }</h4>
        <img src="${ user.avatarURL }" class="avatar" alt="">
        </div>
    </div>`;
    usersDiv.insertAdjacentHTML('beforeend', template);
  })
};

var fetchUser = function (query) {
  const url = `https://api.github.com/repos/facebook/react/commits/${query}`;
  fetch(url, {
    method: 'GET',
    dataType: 'json'
  })
    .then(data => data.json())
    .then(data => addUser(data));
}

const addUser = function (data) {
    
  const user = {
    login: data.author.login || null,
    avatarURL: data.author.avatar_url || null,
    }

    users.push(user);
    renderUsers();
}

document.querySelector('.search').addEventListener('click', function () {
  const button = this;
  button.disabled = true;
  button.innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i> loading...';

  const searchTerm = document.querySelector('#search-query').value;

  fetchUser(searchTerm);

  document.querySelector('#search-query').value = '';
  button.disabled = false;
  button.innerHTML = 'Search';

});

renderUsers();