import { useState, useRef } from "react";
import { diffWords } from "diff";
import "./TextDifferenceChecker.css";

export default function TextDifferenceChecker() {
  const [originalText, setOriginalText] = useState("");
  const [changedText, setChangedText] = useState("");
  const [diffOutputOriginal, setDiffOutputOriginal] = useState([]);
  const [diffOutputChanged, setDiffOutputChanged] = useState([]);

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const handleCompare = () => {
    if (!originalText.trim() && !changedText.trim()) return;

    if (originalText.trim() === changedText.trim()) {
      alert("The texts are identical!");
      setDiffOutputOriginal([]);
      setDiffOutputChanged([]);
      return;
    }

    const diffs = diffWords(originalText, changedText);

    const outputOriginal = diffs.map((part, idx) =>
      part.removed ? (
        <span key={idx} className="removed">
          {part.value}
        </span>
      ) : !part.added ? (
        <span key={idx}>{part.value}</span>
      ) : null
    );

    const outputChanged = diffs.map((part, idx) =>
      part.added ? (
        <span key={idx} className="added">
          {part.value}
        </span>
      ) : !part.removed ? (
        <span key={idx}>{part.value}</span>
      ) : null
    );

    setDiffOutputOriginal(outputOriginal);
    setDiffOutputChanged(outputChanged);
  };

  const syncScroll = (sourceRef, targetRef) => {
    if (sourceRef.current && targetRef.current) {
      targetRef.current.scrollTop = sourceRef.current.scrollTop;
    }
  };

  return (
    <div className="diff-container">
      <h1>Text Difference Checker</h1>

      <div className="text-area-container">
        <textarea
          value={originalText}
          onChange={(e) => setOriginalText(e.target.value)}
          placeholder="Original text (left)"
        />
        <textarea
          value={changedText}
          onChange={(e) => setChangedText(e.target.value)}
          placeholder="Changed text (right)"
        />
      </div>

      <button className="compare-button" onClick={handleCompare}>
        Compare
      </button>

      <div className="diff-output-container">
        <div
          ref={leftRef}
          className="diff-output"
          onScroll={() => syncScroll(leftRef, rightRef)}
        >
          {diffOutputOriginal}
        </div>
        <div
          ref={rightRef}
          className="diff-output"
          onScroll={() => syncScroll(rightRef, leftRef)}
        >
          {diffOutputChanged}
        </div>
      </div>
    </div>
  );
}
