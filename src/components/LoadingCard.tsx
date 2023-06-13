import chevronRight from "../assets/chevron_right.svg";
import chevronLeft from "../assets/chevron_left.svg";
import pokeball from "../assets/pokeball.svg";
import weight from "../assets/weight.svg";
import height from "../assets/height.svg";
import arrow_left from "../assets/arrow_left.svg";

/**
 * Component that displays the loading card wiht special UI
 */
export default function LoadingCard() {
  return (
    <>
      <div className={`loading-card-container`}>
        <div className="pokeball">
          <img src={pokeball} alt="pokeball" />
        </div>
        <div className="title">
          <img src={arrow_left} alt="Retour" className="arrow_left" />
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-number"></div>
        </div>
        <div className="image">
          <img src={chevronLeft} alt="chevron-left" className="chevron left" />
          <div className="skeleton skeleton-img"></div>
          <img
            src={chevronRight}
            alt="chevron-right"
            className="chevron right"
          />
        </div>
        <div className="card-info">
          <div className="type-container">
            <div className="skeleton skeleton-type"></div>
            <div className="skeleton skeleton-type"></div>
          </div>
          <div className={`about`}>
            <h2>About</h2>
          </div>
          <div className="attributes">
            <div className="weight">
              <div className="weight-info">
                <img src={weight} alt="weight" className="img_weight" />
                <div className="skeleton skeleton-weight"></div>
              </div>
              <span>Weight</span>
            </div>
            <div className="height">
              <div className="height-info">
                <img src={height} alt="height" className="img_height" />
                <div className="skeleton skeleton-height"></div>
              </div>
              <span>Height</span>
            </div>
            <div className="abilities">
              <div className="skeleton skeleton-abilities"></div>
              <span>Abilities</span>
            </div>
          </div>
          <div className="description">
            <div className="skeleton skeleton-description"></div>
          </div>
          <div className={`base-stats`}>
            <h2>Base Stats</h2>
            <div className="base-stats-content">
              <div className="label">
                <p>HP</p>
                <p>ATK</p>
                <p>DEF</p>
                <p>SpATK</p>
                <p>SpDEF</p>
                <p>SPE</p>
              </div>
              <div className="value">
                <div className="skeleton skeleton-base-stat"></div>
                <div className="skeleton skeleton-base-stat"></div>
                <div className="skeleton skeleton-base-stat"></div>
                <div className="skeleton skeleton-base-stat"></div>
                <div className="skeleton skeleton-base-stat"></div>
                <div className="skeleton skeleton-base-stat"></div>
              </div>
              <div className="chart">
                <div className="stat" style={{ width: `75%` }}>
                  <div
                    className="stat"
                    style={{ width: `133%`, opacity: "0.2" }}
                  ></div>
                </div>
                <div className="stat" style={{ width: `75%` }}>
                  <div
                    className="stat"
                    style={{ width: `133%`, opacity: "0.2" }}
                  ></div>
                </div>
                <div className="stat" style={{ width: `75%` }}>
                  <div
                    className="stat"
                    style={{ width: `133%`, opacity: "0.2" }}
                  ></div>
                </div>
                <div className="stat" style={{ width: `75%` }}>
                  <div
                    className="stat"
                    style={{ width: `133%`, opacity: "0.2" }}
                  ></div>
                </div>
                <div className="stat" style={{ width: `75%` }}>
                  <div
                    className="stat"
                    style={{ width: `133%`, opacity: "0.2" }}
                  ></div>
                </div>
                <div className="stat" style={{ width: `75%` }}>
                  <div
                    className="stat"
                    style={{ width: `133%`, opacity: "0.2" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
