// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   incrementIfOdd,
//   selectCount,
// } from './counterSlice';
// import styles from './Main.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import IframeResizer from 'iframe-resizer-react';
import defaultReddit from '../../store/default.json';

// TODO: https://www.npmjs.com/package/snudown-js

export function Main() {
  // console.dir(defaultReddit.data);
  return (
    <div>
      <ul style={{overflowX: 'hidden'}}>
        {defaultReddit.data.children.map(item => <Article key={item.data.name} data={item.data} />)}
      </ul>
            {/* {JSON.stringify(defaultReddit)} */}
    </div>
  );
}

export function Article(props) {
  console.dir(props);
  return (
        <li key={props.data.name}>
          <h3 className="title">{props.data.title}</h3>
          <small>[{props.data.post_hint}]</small>
          {/* <h4>PROPS: ((((({JSON.stringify(props)})))))</h4> */}
          {props.data.selftext_html ? <div>Selftext: <Selftext selftext_markdown={props.data.selftext} selftext_html={props.data.selftext_html} title={props.data.name} /></div> : false}
          {props.data.url ? <div>Url: <a href={props.data.url}>{props.data.url}</a></div> : false}
          {props.data.thumbnail ? <div>Thumbnail: <img src={props.data.thumbnail} alt={props.data.title}  /></div> : false}
          {props.data.post_hint === 'image' ? <div>Image: <img src={props.data.url} alt={props.data.title} width={'25%'} /></div> : false}
          {props.data.post_hint === 'hosted:video' ? <div>Video: <Video data={props.data.media.reddit_video} /></div> : false}
          {props.data.secure_media_embed.media_domain_url ? <iframe title={props.data.name} src={props.data.secure_media_embed.media_domain_url} height={props.data.secure_media_embed.height} width={props.data.secure_media_embed.width}></iframe> : false}
          {/* {props.data.preview && props.data.preview.images && props.data.preview.images[0].source.url ? <img src={props.data.preview.images[0].source.url} alt={props.data.title} /> : false } */}
          <Property data={props.data} />
        </li>
  );
}

export function Property(props) {
  return (
    <div key={props.data.name}>
      {Object.entries(props.data).map(entry => <span key={entry[0]}><b>{entry[0]}:</b> <span>{entry[0] === 'all_awardings' ? '...' : JSON.stringify(entry[1])}</span>; </span> )}
    </div>
);
}

export function Selftext(props) {
  const selftext_html = '<!doctype html><body>' + props.selftext_html.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&') + '</body>';
  return (
    <div>
      <div className="selftext" style={{border: 'solid green'}}>
        <ReactMarkdown children={props.selftext_markdown} remarkPlugins={[remarkGfm]} />
      </div>
      <div className="selftext" style={{border: 'solid blue'}}>
        {/* <iframe srcdoc={'<!doctype html><body>' + props.selftext_html  + '</body>'} title={props.title} height='100%' width='100%'></iframe> */}
        <IframeResizer
          log
          srcDoc={selftext_html} 
          title={props.title}
          style={{ width: '1px', minWidth: '100%'}}
        />
      </div>
    </div>
  );
}

export function Video(props) {
  return (
    <video height={props.data.height} width={props.data.width} controls>
      <source src={props.data.fallback_url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  
    );
}
