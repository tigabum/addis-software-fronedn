import React, { useEffect, useState } from "react";
import axios from "axios";
import ListItemContainer from "../ListItemContainer";
import CreateSongForm from "./CreateSongForm";
import EditSongForm from "./EditSongForm";


const SongsContainer = () => {
  const [songs, setSongs] = useState([]);
  const [creatingNewSong, setCreatingNewSong] = useState(false);
  const [editingCurrentSong, setEditingCurrentSong] = useState(false);
  const [currentSong, setCurrentSong] = useState({name: '', artist: '', genre: []})
  useEffect(() => {
    axios
      .get("http://localhost:4000/songs/list")
      .then((res) => setSongs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleCreateNewAlbumClick = () => {
    setCreatingNewSong(true);
    setEditingCurrentSong(false);
  };

  const handleCancelFormClick = () => {
      setCreatingNewSong(false)
  }

  const handleCancelEditClick = () => {
      setEditingCurrentSong(false)
  }

  const renderNewSongForm= ()=>{
    if (creatingNewSong) {
        return <CreateSongForm handleCancel={handleCancelFormClick}/>;
    }
}

const renderEditSongForm= ()=> {
    if (editingCurrentSong) {
        return <EditSongForm song={currentSong} handleCancel={handleCancelEditClick} />;
    }
}

  const songsList =
    songs.length === 0 ? (
      "there is no song record!"
    ) : (
      <ListItemContainer
        type={"songs"}
        data={songs}
        handleButtonClick={handleCreateNewAlbumClick}
      />
    );
  return (
    <div>
      {songsList}
      {renderNewSongForm()}
      {renderEditSongForm()}
    </div>
  );
};
export default SongsContainer;
