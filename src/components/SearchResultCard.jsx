import "./common.css"
const SearchResultCard = props => (
    <div className="Search-Card" key={props.key} onClick={props.selected}>
        <img src={props.imgSrc} alt="img" width="64px" height="64px"/>
        <div className="Search-Card-info">
            <p>{props.name}</p>
        </div>
    </div>
)
export default SearchResultCard