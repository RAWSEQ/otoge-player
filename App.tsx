import React from 'react';
import { StyleSheet, View, Dimensions, Platform, TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Svg, { G, Rect, Path } from "react-native-svg"
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
let posA = 0;
export default function App() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [videosource, setVideosource] = React.useState('');
  const [splashHide, setSplashHide] = React.useState(false);
  
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);

  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      video.current.setPositionAsync(0);
      setVideosource(result.uri);
      if (!splashHide) setSplashHide(true);
      video.current.playAsync();
    }
  };

  const getMillis = () => {
    return status.positionMillis;
  }

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: videosource,
        }}
        useNativeControls={false}
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      >
        <View style={[styles.splash,(splashHide)?styles.buttonSvgHide:{}]}>
          <Svg
            width={500.031}
            height={30.16}
            viewBox="0 0 205.59 7.98"
            style={styles.splashTitle}
          >
            <G
              aria-label="otoge-player"
              transform="scale(1)"
            >
              <Path
                d="M.041 7.938L0 2.481q.083-.578.165-.868.124-.29.372-.661.248-.414.703-.579.455-.207 1.2-.207h12.112q.992 0 1.364.372.414.372.662 1.075v4.341q-.207 1.86-2.15 1.984V2.44H2.274v3.597h12.113v1.901zM18.231 2.316h7.483v5.622h2.109V2.316h7.028q.082-1.24-.497-1.736-.578-.538-1.736-.496L20.63.042q-2.232.124-2.398 2.274zM36.504 7.938l-.041-5.457q.083-.578.165-.868.124-.29.372-.661.248-.414.703-.579.455-.207 1.199-.207h12.113q.992 0 1.364.372.414.372.662 1.075v4.341q-.207 1.86-2.15 1.984V2.44H38.737v3.597H50.85v1.901zM54.694 7.938l.083-5.705Q54.86.25 56.968.083h12.237Q70.28.002 70.817.58q.538.537.455 1.777H56.968v3.597h12.154V5.17h-8.02V3.143h10.17V7.98zM75.985 3.143v1.984h10.542V3.143zm-3.06 4.795V2.275Q73.092.166 75.325.084H87.23q2.315-.042 2.232 2.232H75.158v3.638h14.304v1.984zM91.157 2.15v1.985h5.044V2.151zM97.854 7.938h2.274V2.316h12.155v1.695H100.79v1.984h13.642V1.82q-.206-1.075-.496-1.323-.496-.413-1.653-.455h-11.824q-2.398-.082-2.522 2.233zM118.401.042q-2.026-.041-2.315 2.109v5.787h14.676q1.902-.04 1.943-2.273h-14.304zM134.317 7.938V2.151q.166-2.109 2.357-2.067h12.195q1.943.082 2.026 1.777v6.077h-2.15V6.037h-11.492V4.052h11.492V2.316h-12.154v5.622zM166.977.084v2.935h-5.747v4.92h2.15V5.002h3.597q1.902-.165 2.15-2.108V.084zm-12.154 0q-2.274.041-2.274 2.232v2.687h8.02V3.02h-5.746zM173.84 3.143v1.984h10.542V3.143zm-3.06 4.795V2.275q.166-2.109 2.398-2.191h11.906q2.315-.042 2.233 2.232h-14.304v3.638h14.304v1.984zM189.012 7.938h2.273V2.275h12.155V3.97h-11.493v1.984h9.343v1.943h2.15V5.995q2.067-.413 2.15-1.901V1.737q-.083-1.777-1.985-1.736h-11.947q-2.44-.041-2.605 2.067z"
                fill="rgba(255, 255, 255, 1)"
              />
            </G>
          </Svg>
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.buttons}
            onPress={pickImage}
          >
            <Svg
              viewBox="-0.5 -0.5 111 111"
              style={styles.buttonSvg}
            >
              <G transform="scale(1)">
                <Rect width={110} height={110} rx={16.5} ry={16.5} fill="#9e9e9e" />
                <Path fill="#fff" d="M21.25 33h67.5v57h-67.5zM21.25 30l3-10H57l3 10z" />
              </G>
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}
            onPress={() => {
              video.current.setPositionAsync(0);
            }}
          >
            <Svg
              viewBox="-0.5 -0.5 111 111"
              style={styles.buttonSvg}
            >
              <G transform="scale(1)">
                <Rect width={110} height={110} rx={16.5} ry={16.5} fill="#9e9e9e" />
                <Path d="M59 90L24 55l35-35z" fill="rgba(255, 255, 255, 1)" />
                <Path d="M88 90L53 55l35-35z" fill="rgba(255, 255, 255, 1)" />
                <Path fill="#fff" d="M17 20h10v70H17z" />
              </G>
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}
            onPress={() => {
              video.current.setPositionAsync(Math.max(status.positionMillis - 5000, 0));
            }}
          >
            <Svg
              viewBox="-0.5 -0.5 111 111"
              style={styles.buttonSvg}
            >
              <G transform="scale(1)">
                <Rect width={110} height={110} rx={16.5} ry={16.5} fill="#9e9e9e" />
                <Path
                  d="M53 90L18 55l35-35zM88 90L53 55l35-35z"
                  fill="rgba(255, 255, 255, 1)"
                />
              </G>
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}
            onPress={() => {
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync();
            }}
          >
            <Svg
              viewBox="-0.5 -0.5 111 111"
              style={[styles.buttonSvg,(status.isPlaying)?styles.buttonSvgHide:{}]}
            >
              <G transform="scale(1)">
                <Rect width={110} height={110} rx={16.5} ry={16.5} fill="#9e9e9e" />
                <Path d="M25 20l65 35-65 35z" fill="rgba(255, 255, 255, 1)" />
              </G>
            </Svg>
            
            <Svg
              viewBox="-0.5 -0.5 111 111"
              style={[styles.buttonSvg,(status.isPlaying)?{}:styles.buttonSvgHide]}
            >
              <G transform="scale(1)">
                <Rect width={110} height={110} rx={16.5} ry={16.5} fill="#9e9e9e" />
                <Path fill="#fff" d="M20 20h25v70H20zM65 20h25v70H65z" />
              </G>
            </Svg>

          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}
            onPress={() => {
              video.current.setPositionAsync(status.positionMillis + 5000);
            }}
          >
            <Svg
              viewBox="-0.5 -0.5 111 111"
              style={styles.buttonSvg}
            >
              <G transform="scale(1)">
                <Rect width={110} height={110} rx={16.5} ry={16.5} fill="#9e9e9e" />
                <Path d="M25 20l35 35-35 35zM60 20l35 35-35 35z" fill="rgba(255, 255, 255, 1)" />
              </G>
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}
            onPress={() => {
              posA = status.positionMillis;
            }}
          >
            <Svg
              viewBox="-0.5 -0.5 111 111"
              style={styles.buttonSvg}
            >
              <G transform="scale(1)">
                <Rect width={110} height={110} rx={16.5} ry={16.5} fill="#9e9e9e" />
                <Path fill="#fff" d="M18.5 80h73v10h-73z" />
                <Path
                  d="M37.16 20.5h10v40h10.5l-15.5 19-15.5-19h10.5V40z"
                  fill="rgba(255, 255, 255, 1)"
                />
                <Path d="M47.16 60.5h10.5l-15.5 19-15.5-19h10.5" fill="none" />
              </G>
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}
            onPress={() => {
              video.current.setPositionAsync(posA);
            }}
          >
            <Svg
              viewBox="-0.5 -0.5 111 111"
              style={styles.buttonSvg}
            >
              <G transform="scale(1)">
                <Rect width={110} height={110} rx={16.5} ry={16.5} fill="#9e9e9e" />
                <Path fill="#fff" d="M18.5 80h73v10h-73z" />
                <Path
                  d="M35 20.5h10V67.37h.5L40 79.5l-5.5-12.13h.5V40z"
                  fill="rgba(255, 255, 255, 1)"
                />
                <Path d="M45 67.37h.5L40 79.5l-5.5-12.13h.5" fill="none" />
                <Path d="M53 20l35 20-35 20z" fill="rgba(255, 255, 255, 1)" />
              </G>
            </Svg>

          </TouchableOpacity>
        </View>
      </Video>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    zIndex: 888,
  },
  splashTitle: {
    zIndex: 890,
  },
  video: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  buttonArea: {
    position: "absolute",
    flexDirection: "row",
    top: 10,
    right: 20,
    zIndex: 999,
  },
  buttons: {
    display: "flex",
    fontSize: 40,
    width: 45,
    height: 45,
  },
  buttonSvg: {
    width: 40,
    height: 40,
    opacity: 0.85,
    position: 'absolute',
    left:0,
    top:0
  },
  buttonSvgHide: {
    opacity: 0,
  }
});
