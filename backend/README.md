## MongoDB Daten

user: mongo
password: mongoadmin

** Connection String **
mongodb+srv://mongo:mongoadmin@cluster0.apvqyba.mongodb.net/Educaty

## Datenbank

db: Educaty

## server.js

im server.js wird express für die Serveranwendung und mongoose für die Datenbankanbindung importiert. Außerdem wird die Datenbankverbindung hergestellt und die Datenbank mit dem Schema verknüpft.

    import express from 'express';
    import mongoose from 'mongoose';
    import dotenv from 'dotenv';
    import cors from 'cors';

    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

im server.js wird auch der Port festgelegt und der Server gestartet.

    const app = express();
    const port = 5000;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

die Route wird im server.js importiert und dem Server bekannt gemacht.

    import userRoute from './routes/users.js';

    app.use('/api', userRoute);

im server.js wird noch Multer für das Uploaden von Bildern importiert.

    import multer from 'multer';

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images');
        },
        filename: (req, file, cb) => {
            cb(null, req.body.name);
        }
    });

    const upload = multer({ storage: storage });
    app.post('/api/upload', upload.single('file'), (req, res) => {
        res.status(200).json('File has been uploaded');
    });

der Struktur des Backend folgt das MVC Pattern. Die Modelle werden im models Ordner definiert. Die Controller werden im controllers Ordner definiert. Die Routen werden im routes Ordner definiert.

im models wird das User Schema definiert. Das Schema wird mit mongoose definiert.

    import {Schema} from 'mongoose';
    const UserSchema = new Schema(

{
firstname: {
type: String,
required: true,
},
lastname: {
type: String,
required: true,
},
username: {
type: String,
required: true,
unique: true,
},
email: {
type: String,
required: true,
unique: true,
},
password: {
type: String,
required: true,
},
role: {
type: Types.ObjectId,
ref: 'Role',
required: true,
default: () => roleId,
},
courses: [
{
type: Types.ObjectId,
ref: 'Course',
required: false,
},
],
},
{ timestamps: true }
);

    export default mongoose.model('User', userSchema);

im Controllers Ordner wird die Logik für die Routen definiert. Die Logik wird in den Controller ausgelagert. Die Controller werden im routes ordner importiert.

im routes Ordner werden die Routen definiert. Die Routen werden mit express definiert.

    import { Router } from 'express';

    import {
      addCourseToUser,
      deleteUser,
      readAllUsers,
      readUser,
      getUserCourses,
      getUserPosts,
      setAdmin,
      setModerator,
      updateUser,
      getUsersPosts,
    } from '../controllers/UserController.js';

    export default router;

die Dateien für die Routes werden in server.js importiert und dem Server bekannt gemacht.

.env datei wird für die Konfiguration der Datenbank verwendet.

    MONGO_URL=mongodb+srv://mongo:

im middleware Ordner werden die Funktionen für die Authentifizierung definiert.

das Backend ist nun fertig und kann gestartet werden.

    npm start
