import { useEffect, useState } from "react";
import { Avatar, Chip, useTheme } from "@mui/material";
interface Props {
  userid: number;
}
// Simply just shows the name of the user given there userid
export default function Username({ userid }: Props) {
  const [username, setUsername] = useState("");
  useEffect(() => {
    fetch(`/api/user/${userid}`).then(async (val) => {
      const newUsername = await val.json();
      setUsername(newUsername);
    });
  }, [userid]);
  return <>{username}</>;
}
// Creates a simple chip for the user
export function UserChip({ userid }: Props) {
  const [username, setUsername] = useState("A");
  useEffect(() => {
    if (userid != 0) {
      fetch(`/api/user/${userid}`).then(async (val) => {
        const newUsername = await val.json();
        setUsername(newUsername);
      });
    }
  }, [userid]);
  const theme = useTheme();
  if (userid == 0) return <p>AI</p>;
  // Cenerates a color based on the name
  const background = stringToColor(userid);
  const text = theme.palette.getContrastText(background);
  return (
    <Chip
      avatar={
        <Avatar sx={{ bgcolor: background, color: text }}>
          {`${username.split(" ")[0][0]}${
            username.split(" ").length > 1 ? username.split(" ")[1][0] : ""
          }`}
        </Avatar>
      }
      label={username}
    />
  );
}
// Shows an avatar for the user with a color based on the name
export function UserAvatar({ userid }: Props) {
  const [username, setUsername] = useState("A");
  useEffect(() => {
    fetch(`/api/user/${userid}`).then(async (val) => {
      const newUsername = await val.json();
      setUsername(newUsername);
    });
  }, [userid]);
  // Cenerates a color based on the name

  const background = stringToColor(userid);

  const theme = useTheme();
  const text = theme.palette.getContrastText(background);
  return (
    <Avatar sx={{ bgcolor: background, color: text }}>
      {`${username.split(" ")[0][0]}${
        username.split(" ").length > 1 ? username.split(" ")[1][0] : ""
      }`}
    </Avatar>
  );
}
// This turns a number into a random color.
export function stringToColor(string: number) {
  let hash = string * 67280021310722;
  let i;
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = hash % 256;
    hash = parseInt((hash / 256).toString());
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}
