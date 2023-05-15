import SubmitButton from "./SubmitButton";
import { useState } from "react";
import axios from "axios";
import style from "./WordFrequency.module.css";
import Loading from "./Loading";
import Histogram from "./Histogram";

const WordFrequency = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(1);

  const fetchData = () => {
    // console.log("hii there");
    let wordFrequency = {},
      words,
      top20Words;
    axios
      .get("https://www.terriblytinytales.com/test.txt")
      .then((response) => {
        console.log(response.data);
        words = response.data.replace(/[^\w\s]/gi, "").split(/\s+/);
        // console.log(words);
        words.forEach((word) => {
          if (wordFrequency[word]) {
            wordFrequency[word]++;
          } else {
            wordFrequency[word] = 1;
          }
        });
        // console.log(wordFrequency);
        const wordFrequencyArray = Object.entries(wordFrequency);
        wordFrequencyArray.sort((a, b) => b[1] - a[1]);
        // Extract the top 20 words
        top20Words = wordFrequencyArray.slice(0, 20);
        setData(top20Words);
        setLoading(0);
        console.log(top20Words);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <div>
      <SubmitButton fetchData={fetchData} />
      {loading ? <Loading /> : <Histogram freqWords={data} />}
      {/*{loading ? (
        <Loading />
      ) : (
        <ul className={style.histogram}>
          {data.map((ele, ind) => (
            <li key={ind}>{ele[0]}</li>
          ))}
        </ul>
          )}*/}
    </div>
  );
};
export default WordFrequency;
