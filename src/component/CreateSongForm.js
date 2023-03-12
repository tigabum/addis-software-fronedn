import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import GenreFormItem from "./GenreFormItem";

const CreateSongForm = (props) => {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [genres, setGenres] = useState([]);
  const [databaseArtists, setDatabaseArtists] = useState([]);
  const [databaseGenres, setDatabaseGenres] = useState([]);
  const [created, setCreated] = useState(false);
  const [creationMessage, setCreationMessage] = useState("");
  const Navigate = useNavigate()

  let _genreHelper = [];

  useEffect(() => {
    axios.get("http://localhost:4000/artist/list").then((response) => {
      setDatabaseArtists(response.data|| []);
    });

    axios.get("http://localhost:4000/genre/list").then((response) => {
      setDatabaseGenres(response.data|| []);
    });
  });

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleArtistChange = (event) => {
    setArtist(event.target.value);
  };

  const handleGenreChange = (genreId, isChecked) => {
    if (isChecked) {
      let genres = [..._genreHelper, genreId];
      _genreHelper = [...genres];
    } else {
      //!isChecked
      let genres = [..._genreHelper];
      let genreToBeRemovedIndex = genres.indexOf(genreId);
      genres.splice(genreToBeRemovedIndex, 1);
      _genreHelper = genres;
    }
  };

  const setGenresToState = () => {
    setGenres(_genreHelper);
  };

  const convertGenreArrayToString = (genres) => {
    return genres.join(",");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:4000/songs/create", {
        name: name,
        artist: artist || 'aritstone',
        genre: convertGenreArrayToString(genres)|| [],
      })
      .then((response) => {
          setName('')
        setCreated(true);
        setCreationMessage(response.data.message);
      });
  };

  const renderArtistSelect = () => {
    return (
      <select value={artist} onChange={handleArtistChange}>
        {databaseArtists.map((artist) => {
          return (
            <option key={artist.id} value={artist.id}>
              {artist.name}
            </option>
          );
        })}
      </select>
    );
  };

  const renderGenreCheckboxes = () => {
    return (
      <label>
        Genres:
        {databaseGenres.map((genre) => {
          return (
            <GenreFormItem
              key={genre.id}
              genre={genre}
              checked={false}
              handleCheck={handleGenreChange}
            />
          );
        })}
        <button type="button" onClick={setGenresToState}>
          Update Genres
        </button>
      </label>
    );
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
        {/* <label>
          Artist:
          {renderArtistSelect()}
        </label>
        {renderGenreCheckboxes()} */}

        <input type="submit" value="Submit" className="padding-right" />
        <button onClick={props.handleCancel}>Cancel</button>
      </form>
      {renderCreationMessage()}
    </div>
  );
};

export default CreateSongForm;
