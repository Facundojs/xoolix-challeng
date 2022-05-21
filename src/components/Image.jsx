import styled from "@emotion/styled";

const Image = ({ isFavourite, toggleFavourite, ...imageProps }) => (
  <Container>
    <Img alt={imageProps.alt} {...imageProps} />
    <Svg
      onClick={toggleFavourite}
      role="button"
      width="17"
      height="15"
      viewBox="0 0 17 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.42292 15C8.1756 14.9965 7.93968 14.8953 7.76657 14.7187L1.37196 8.324C0.935214 7.88907 0.589285 7.37178 0.354277 6.80197C0.119269 6.23215 -9.42893e-05 5.62137 0.00306844 5.00501C-0.0378551 3.85167 0.331663 2.72116 1.04588 1.81466C1.76009 0.908153 2.77267 0.284407 3.90356 0.0543212C4.56743 -0.0471915 5.24529 -0.00612184 5.89201 0.174958C6.53872 0.356038 7.13943 0.672849 7.65406 1.10434C7.91864 1.32721 8.15765 1.57883 8.36666 1.85449C8.57568 1.57883 8.81468 1.32721 9.07927 1.10434C9.59452 0.673893 10.1952 0.357817 10.8418 0.176789C11.4883 -0.00423855 12.1659 -0.0459762 12.8298 0.0543212C13.9413 0.273773 14.9407 0.876245 15.6535 1.75697C16.3663 2.6377 16.7473 3.7407 16.7303 4.87361C16.7432 5.5081 16.6287 6.1388 16.3936 6.72826C16.1584 7.31771 15.8075 7.85408 15.3614 8.30546L8.96676 14.6999C8.82483 14.8588 8.63302 14.9647 8.42292 15Z" fill={isFavourite ? "red" : "white"} />
    </Svg>
  </Container>
)

const Container = styled.div`
  position: relative;
  height: 160px;
  width: 160px;
  padding: 0;
`

const Img = styled.img`
  border-radius: 5px;
  height: 160px;
  width: 160px;
`

const Svg = styled.svg`
  position: absolute;
  cursor: pointer;
  z-index: 1;
  bottom: 5%;
  right: 5%;
`

export default Image;
