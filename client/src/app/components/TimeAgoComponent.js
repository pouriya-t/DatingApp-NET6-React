import TimeAgo from "react-timeago";

export default function TimeAgoComponent({ datetime }) {
  return (
    <TimeAgo
      formatter={(value, unit, suffix) => {
        if (unit === "second") {
          return "just now";
        } else {
          return value + " " + unit + (value > 1 ? "s" : "") + " " + suffix;
        }
      }}
      date={datetime}
    />
  );
}
