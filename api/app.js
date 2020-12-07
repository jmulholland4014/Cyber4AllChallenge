const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');


const { Catergory, Task, User } = require('./db/models');





app.get('/catergorys', authenticate, (req, res) => {
    
    Catergory.find({
        _userId: req.user_id
    }).then((catergorys) => {
        res.send(catergorys);
    }).catch((e) => {
        res.send(e);
    });
})

app.post('/catergorys', authenticate, (req, res) => {
    
    
    let title = req.body.title;

    let newCatergory = new Catergory({
        title,
        _userId: req.user_id
    });
    newCatergory.save().then((catergoryDoc) => {
        
        res.send(catergoryDoc);
    })
});


app.patch('/catergorys/:id', authenticate, (req, res) => {
    
    Catergory.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    });
});


app.delete('/catergorys/:id', authenticate, (req, res) => {
    
    Catergory.findOneAndRemove({
        _id: req.params.id,
        _userId: req.user_id
    }).then((removedCatergoryDoc) => {
        res.send(removedCatergoryDoc);

        
        deleteTasksFromCatergory(removedCatergoryDoc._id);
    })
});



app.get('/catergorys/:catergoryId/tasks', authenticate, (req, res) => {
    
    Task.find({
        _catergoryId: req.params.catergoryId
    }).then((tasks) => {
        res.send(tasks);
    })
});



app.post('/catergorys/:catergoryId/tasks', authenticate, (req, res) => {
    

    Catergory.findOne({
        _id: req.params.catergoryId,
        _userId: req.user_id
    }).then((catergory) => {
        if (catergory) {
            
            
            return true;
        }

        
        return false;
    }).then((canCreateTask) => {
        if (canCreateTask) {
            let newTask = new Task({
                title: req.body.title,
                _catergoryId: req.params.catergoryId
            });
            newTask.save().then((newTaskDoc) => {
                res.send(newTaskDoc);
            })
        } else {
            res.sendStatus(404);
        }
    })
})


app.patch('/catergorys/:catergoryId/tasks/:taskId', authenticate, (req, res) => {
    

    Catergory.findOne({
        _id: req.params.catergoryId,
        _userId: req.user_id
    }).then((catergory) => {
        if (catergory) {
            
            
            return true;
        }

        
        return false;
    }).then((canUpdateTasks) => {
        if (canUpdateTasks) {
            
            Task.findOneAndUpdate({
                _id: req.params.taskId,
                _catergoryId: req.params.catergoryId
            }, {
                    $set: req.body
                }
            ).then(() => {
                res.send({ message: 'Updated successfully.' })
            })
        } else {
            res.sendStatus(404);
        }
    })
});


app.delete('/catergorys/:catergoryId/tasks/:taskId', authenticate, (req, res) => {

    Catergory.findOne({
        _id: req.params.catergoryId,
        _userId: req.user_id
    }).then((catergory) => {
        if (catergory) {
            
            
            return true;
        }

        
        return false;
    }).then((canDeleteTasks) => {
        
        if (canDeleteTasks) {
            Task.findOneAndRemove({
                _id: req.params.taskId,
                _catergoryId: req.params.catergoryId
            }).then((removedTaskDoc) => {
                res.send(removedTaskDoc);
            })
        } else {
            res.sendStatus(404);
        }
    });
});






app.post('/users', (req, res) => {
    

    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        
        

        return newUser.generateAccessAuthToken().then((accessToken) => {
            
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})



app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            
            

            return user.generateAccessAuthToken().then((accessToken) => {
                
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})


app.get('/users/me/access-token', verifySession, (req, res) => {
    
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
})




let deleteTasksFromCatergory = (_catergoryId) => {
    Task.deleteMany({
        _catergoryId
    }).then(() => {
        console.log("Tasks from " + _catergoryId + " were deleted!");
    })
}




app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})