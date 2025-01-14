// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loadUsers, loadUserById } from "../../../redux/features/users";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
// import Avatar from "@mui/material/Avatar";
// import Stack from "@mui/material/Stack";
// import Box from "@mui/material/Box";
// import { makeStyles, createStyles } from "@material-ui/core/styles";
// import BuildIcon from "@mui/icons-material/Build";
// import BuildCircleIcon from "@mui/icons-material/BuildCircle";
// import LocalSeeIcon from "@mui/icons-material/LocalSee";
// import HandymanIcon from "@mui/icons-material/Handyman";
// import EditIcon from "@mui/icons-material/Edit";
// import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
// import Header from "../HomePage/Header";
// import EditProfilePage from "./EditProfilePage";

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     profile: {
//       display: "flex",
//     },
//     profileCard: {
//       marginLeft: "120px",
//     },
//   })
// );

// function Profile() {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.users.currentUser);
//   const classes = useStyles();
//   const [telep, setTelep] = useState("");
//   console.log(user.name);

//   useEffect(() => {
//     dispatch(loadUsers());
//   }, [dispatch]);
//   useEffect(() => {
//     dispatch(loadUserById());
//   }, [dispatch]);

//   const handleDeleteDescrip = () => {
//     setTelep("");
//   };

//   const handleCreateDescrip = () => {
//     return setTelep(
//       <Grid item xs={12} sm={12}>
//         ff
//         <EditProfilePage />
//       </Grid>
//     );
//   };

//   return (
//     <Grid>
//       {telep}
//       <Box className={classes.profile}>
//         <Stack direction="row" spacing={2} sx={{ width: 80, height: 80 }}>
//           <Avatar
//             sx={{ width: 180, height: 180 }}
//             src={`http://localhost:4000/${user.pathImages}`}
//           />
//           <LocalSeeIcon />
//         </Stack>

//         <Card
//           sx={{ maxWidth: 1000, maxHight: 1000 }}
//           className={classes.profileCard}
//         >
//           <CardActionArea>
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 Имя: {user.name} {user.lastname}
//               </Typography>
//               <hr />
//               <Typography gutterBottom variant="h5" component="div">
//                 Логин: {user.login}
//               </Typography>
//               <hr />
//               <Typography gutterBottom variant="h5" component="div">
//                 Электронная почта: {user.email}
//               </Typography>
//               <hr />
//               <Typography gutterBottom variant="h5" component="div">
//                 Статус: <HandymanIcon color="green" /> {user.workingUser}
//               </Typography>
//               <hr />
//               <Typography gutterBottom variant="h5" component="div">
//                 Телефон: <LocalPhoneIcon color="green" /> {user.telephone}
//               </Typography>
//               <hr />
//               <Typography variant="body2" color="text.secondary">
//                 {" "}
//                 {user.descriptionService}
//               </Typography>
//               <hr />
//             </CardContent>
//           </CardActionArea>
//           <CardActions>
//             <Button size="small" color="primary" onClick={handleCreateDescrip}>
//               <EditIcon /> Редактировать
//             </Button>
//           </CardActions>
//         </Card>
//       </Box>
//     </Grid>
//   );
// }

// export default Profile;
