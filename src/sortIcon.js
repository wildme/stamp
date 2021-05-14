const SortIcon = ({direction = ""}) => {
    return (
     <section className={`sort-icon_${direction}`}>
        <span id="arrow-up">▲</span>
        <span id="arrow-down">▼</span>
     </section>
    );
};
export default SortIcon;
