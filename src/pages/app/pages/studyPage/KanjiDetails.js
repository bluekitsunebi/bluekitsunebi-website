import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const MainDetails = styled.div`
  ${tw`flex flex-col items-center gap-2 sm:gap-4 mx-auto min-h-28 sm:min-h-44`}
`;

const KanjiDetails = ({ kanjiData }) => (
  <MainDetails>
    <div>
      {kanjiData?.kanji?.meanings.length > 3
        ? kanjiData?.kanji?.meanings.slice(0, 3).join(", ")
        : kanjiData?.kanji?.meanings.join(", ")}
    </div>

    {kanjiData?.kanji?.kun_readings.length !== 0 && (
      <div>
        <b>kun:</b> {kanjiData?.kanji?.kun_readings.join(", ")}
      </div>
    )}
    {kanjiData?.kanji?.on_readings.length !== 0 && (
      <div>
        <b>on:</b> {kanjiData?.kanji?.on_readings.join(", ")}
      </div>
    )}
  </MainDetails>
);

export default KanjiDetails;
