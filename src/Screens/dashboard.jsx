import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardHeader from "../Components/Dashboard/dashboardHeader";
import SingleTaskBlock from "../Components/Dashboard/singleTaskBlock";
import Loader from "../Components/Loader/loader";
import { themeColor1 } from "../config";
import { firestore } from "../firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import useAuthentication from "../Hooks/authUtils";

const Dashboard = () => {
    const { authUser } = useAuthentication();
    const [username, setUsername] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    const fetchData = async () => {
        if (authUser) {
        // Fetch user data
        const userDocRef = doc(firestore, "users", authUser);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUsername(userData.name);
        } else {
            console.log("User document not found.");
        }

        // Fetch ToDo list - Realtime
        const taskCollection = collection(
            firestore,
            "users",
            authUser,
            "todolist"
        );

        const unsubscribe = onSnapshot(taskCollection, (querySnapshot) => {
            const taskList = [];
            querySnapshot.forEach((doc) => {
            const taskData = doc.data();
            taskList.push({
                id: doc.id,
                title: taskData.taskTitle,
                description: taskData.taskDescription,
                isCheck: taskData.isCheck,
                date: taskData.date,
            });
            });

            setTasks(taskList);
            setIsLoading(false);
        });
        return unsubscribe;
        }
    };

    useEffect(() => {
        fetchData();
    }, [authUser]);

    return (
        <React.Fragment>
        {isLoading ? (
            <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:themeColor1
            }}
            >
            <Loader />
            </Box>
        ) : authUser ? (
            <Box sx={{ background: themeColor1, minHeight: "100vh" }}>
            <DashboardHeader username={username} />

            <Box sx={{ paddingY: "1.5rem" }}>
                <Grid container display={"flex"} justifyContent={"space-evenly"}>
                {tasks.map((task) => (
                    <SingleTaskBlock
                    id={task.id}
                    taskTitle={task.title}
                    taskDescription={task.description}
                    checkState={task.isCheck}
                    date={task.date}
                    />
                ))}
                </Grid>
            </Box>
            </Box>
        ) : null}
        </React.Fragment>
    );
};

export default Dashboard;
