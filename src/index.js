import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import _ from 'lodash';

import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer'
import NavBar from './components/NavBar'

const YT_API = 'YOUR_YOUTUBE_API_KEY'; 

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.searchYoutube('');
  }

  videoSearch = _.debounce((term) => { this.searchYoutube(term) }, 300);

  searchYoutube(term) {
    YTSearch({ key: YT_API, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    return (
      <div>
        <NavBar siteTitle="Simple YouTube search" />
        <div className="container">
          <SearchBar
            onChange={(searchTerm) => {this.videoSearch(searchTerm)}} />
          <VideoList
            onVideoSelect={(selectedVideo) => {this.setState({selectedVideo})}}
            videos={this.state.videos}
            />
          <VideoPlayer video={this.state.selectedVideo} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.app'));
