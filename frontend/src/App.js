import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import AddAlbum from "./components/addAlbumPage";
import AllAlbums from "./components/albumsPage";
import AddPicsPage from "./components/addPicsPage";
import PicPage from "./components/picsPage";
import EditPicsPage from "./components/editPicsPage";
import EditAlbumsPage from "./components/editAlbumsPage";
import AlbumBar from "./components/albumsBar";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [url, setUrl] = useState("./images/1582050035728.jpg")
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const changeBackground = () => {
    const src = ["./images/1582050035728.jpg", "./images/colorful-landscape-photography-1002.jpg", "./images/Dan-Ballard-Landscapes-6.jpg", "./images/koJs46qPG4rPsL6KohQac3.jpg", "./images/Landscape-Tips-Mike-Mezeul-II.jpg"]
    const setNewImage = () => {
      setUrl(src[Math.floor(Math.random() * 5)])
    }
    console.log(url)
    setInterval(setNewImage, 8000)
  }
  useEffect(() => {
    changeBackground()
  }, [])
  return (
    <div id="background" style={{ backgroundImage: `url(${url})` }}>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <SplashPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/addAlbums">
            <AddAlbum />
          </Route>
          <Route exact path="/albums">
            <div className="albumBarContiner">
              <AlbumBar />
              <AllAlbums />
            </div>
          </Route>
          <Route exact path="/albums/:id">
            <div className="albumBarContiner">
              <AlbumBar />
              <PicPage />
            </div>
          </Route>
          <Route exact path="/albums/:id/newPic">
            <AddPicsPage />
          </Route>
          <Route path="/albums/:id/edit">
            <EditAlbumsPage />
          </Route>
          <Route path="/albums/:albumId/pics/:PictureId/edit">
            <EditPicsPage />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
