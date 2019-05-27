const aj = {};
aj.xhr_url = 'https://reqres.in/api/users';
aj.btn = document.querySelector("button.search");
aj.input = document.querySelector("input");
aj.users = '';

aj.utils = {};
aj.utils.method = {};

aj.utils.method.getData = function () {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', aj.xhr_url);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            aj.users = JSON.parse(xhr.responseText).data;
            console.log(JSON.parse(xhr.responseText));
        } else {
            aj.users =  'Something went wrong';
        }
        aj.utils.method.showUsers();
    };

    return  aj.users;
};

aj.utils.method.appendMsg = function (msgText) {
    aj.utils.method.createEl('div',msgText, true,true,'msg');
};

aj.utils.method.createEl = function(tag,txt,appendCH,parent,className) {
    let cls = className || false;
    let apCH = appendCH || false;
    let el = document.createElement(tag);
    el.textContent = txt ? txt : '';
    if(cls) el.classList.add(cls);
    if(apCH) {
        if(parent) {
            parent.appendChild(el);
        } else {
            document.body.appendChild(el);
        }
    }
};


aj.utils.method.showUsers = function() {

    if(typeof aj.users === 'object') {
        aj.utils.method.createUserList(aj.users);
    } else {//
        aj.utils.method.appendMsg(aj.users);
    }
};

aj.utils.method.createUserList = function(usr) {
    aj.utils.method.createEl('ul',false,true,false, 'user-list');
    usr.forEach((element,index) => {
        aj.utils.method.createEl('li','',true,document.querySelector('ul'), 'item');
        aj.utils.method.createEl('img','',true,document.querySelector(`li:nth-child(${index+1})`),'img');
        aj.utils.method.createEl('span',element.first_name +' '+ element.last_name,true,document.querySelector(`li:nth-child(${index+1})`),'name');
        aj.utils.method.createEl('span',element.email,true,document.querySelector(`li:nth-child(${index+1})`),'email');
        document.querySelector(`li:nth-child(${index+1}) img`).src = element.avatar;
    });
};

aj.utils.method.searchUser = function (val) {
    document.querySelectorAll('li').forEach((element)=>{
        element.classList.remove('hightlight');
    });
    if(val.length >=3) {
        aj.users.forEach((element, index) => {
            if (element.first_name.match(val) || element.last_name.match(val)) {
                document.querySelector(`li:nth-child(${index+1})`).classList.add('hightlight');
            } else {

            }
        });
    }
};

aj.utils.method.getData();


aj.input.addEventListener('keyup',(event)=>{aj.utils.method.searchUser(event.target.value)});
