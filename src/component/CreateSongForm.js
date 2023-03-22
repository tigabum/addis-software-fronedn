import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import GenreFormItem from "./GenreFormItem";

const CreateSongForm = (props) => {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenres] = useState("");
  const [album, setAlbum] = useState("")

  const [databaseArtists, setDatabaseArtists] = useState([]);
  const [databaseGenres, setDatabaseGenres] = useState([]);
  const [created, setCreated] = useState(false);
  const [creationMessage, setCreationMessage] = useState("");
  const navigate = useNavigate()

  let _genreHelper = [];

  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/artist/list").then((response) => {
      setDatabaseArtists(response.data|| []);
    });

    axios.get("http://localhost:4000/api/v1/genre/list").then((response) => {
      setDatabaseGenres(response.data|| []);
    });
  },[]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleArtistChange = (event) => {
    setArtist(event.target.value);
  };

  const handlGenreChange = (event) => {
      setGenres(event.target.value)
  }

  const handleAlbumChange = (event) => {
      setAlbum(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:4000/api/v1/songs/create", {
        title: name,
        Artist: artist,
        Genre: genre,
        Album:album
      })
      .then((response) => {
          console.log('response is', response)
          setName('')
          setAlbum('')
          setArtist('')
          setGenres('')
        setCreated(true);
        setCreationMessage(response.data.message);
        navigate('/')
    });
  };

  const renderCreationMessage = () => {
    if (created) {
      return <p>{creationMessage}</p>;
    }
  };
  return (
    <div>
      <h4>Create a new Song</h4>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Artist:
          <input type="text" value={artist} onChange={handleArtistChange} />

          {/* {renderArtistSelect()} */}
        </label>
        <label>
          Album:
          <input type="text" value={album} onChange={handleAlbumChange} />

        {/* {renderGenreCheckboxes()} */}
        </label>
        <label>
          Genre:
          <input type="text" value={genre} onChange={handlGenreChange} />

        {/* {renderGenreCheckboxes()} */}
        </label>

        <input type="submit" value="Submit" className="padding-right" />
        <button onClick={props.handleCancel}>Cancel</button>
      </form>
      {renderCreationMessage()}
    </div>
  );
};

export default CreateSongForm;
