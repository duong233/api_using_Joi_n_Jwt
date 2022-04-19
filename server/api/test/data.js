const example = {
    user:{
        username: 'duongvt@gmail.com',
        password: 'Duong233'
    },
    invalidUser:{
        username: 'duong233@gmail.com',
        password: '123456'
    },
    userSchema: {
        name: 'Long',
        username: 'duongvt@gmail.com',
        password:'Duong233',
        confirmPassword: 'Duong233'
    },
    userPassInvalid: {
        name: 'test',
        username: 'duongvt@gmail.com',
        password: 'doung23',
        confirmPassword: 'doung23'
    },
    userPassNotMatch: {
        name: 'test',
        username: 'duongvt@gmail.com',
        password: 'Duopng234',
        confirmPassword: 'Duopng243'
    },
}

module.exports = example;