

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

const YOUTUBE_VIDEO_LINK = 'https://www.youtube.com/watch?v=';

const YOUTUBE_CHANNEL_LINK = 'https://www.youtube.com/channel/';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      maxResults: '25',
      part: 'snippet',
      key: 'AIzaSyAyJe1RuE0HkffDCIU-U2qeqhWcwXesarY',
      q: searchTerm,

    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function renderResult(result) {
  let renderObj = [];
  let itemQuantity = result.items.length;
  renderObj.push(`<h3>There are ${itemQuantity} results for your search query</h3>`);
  for (let i = 0; i < itemQuantity; i++) {
    let kind = result.items[i].id.kind;
    let url = kind === "youtube#video" ? YOUTUBE_VIDEO_LINK + result.items[i].id.videoId : YOUTUBE_CHANNEL_LINK + result.items[i].id.channelId;
    let imageSrc = result.items[i].snippet.thumbnails.medium.url;
    let altAttr = result.items[i].title;
    renderObj.push(`
   <a class="result" href='${url}'><img src='${imageSrc}' alt='${altAttr}'/></a>
  `);
  }


  return renderObj.join("");
}

function displayYouTubeSearchData(data) {
  const results = renderResult(data);
  $('.js-search-results').prop('hidden', false).html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);

