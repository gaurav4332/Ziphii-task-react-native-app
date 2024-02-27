import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import WrapperContainer from "../container/WrapperContainer";
import TextComp from "../components/TextComp";
import { useSelector } from "react-redux";
import colors from "../styles/colors";
import fonts from "../assets/fonts";
import {
  scale,
  textScale,
  verticalScale,
  width,
} from "../styles/responsiveSize";
import { changeAppTheme } from "../redux/actions/appSettings";
import images from "../assets";

const CountryDetail = ({ navigation, route }) => {
  const { selectedTheme } = useSelector((state) => state?.appSetting);
  const data = route?.params?.data ?? false;
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const onPressTheme = () => {
    if (isDarkTheme) {
      changeAppTheme("light");
    } else {
      changeAppTheme("dark");
    }
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <WrapperContainer>
      <View
        style={[
          styles.headerView,
          {
            backgroundColor:
              selectedTheme == "dark" ? colors.light_background : colors.white,
          },
        ]}
      >
        <TextComp
          text="Where in the world?"
          style={{ fontFamily: fonts.NunitoBold, fontWeight: "700" }}
        />
        <TouchableOpacity
          onPress={onPressTheme}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={images.moon_fill}
            tintColor={
              selectedTheme == "dark" ? colors.white : colors.blackColor
            }
            resizeMode="contain"
            style={{ height: scale(10), width: scale(10) }}
          />
          <TextComp
            text={selectedTheme == "dark" ? "Light Mode" : "Dark Mode"}
            style={{
              paddingLeft: scale(10),
              fontSize: textScale(10),
              fontWeight: "500",
              fontFamily: fonts.NunitoMedium,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: scale(16) }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          style={[
            styles.backButton,
            {
              backgroundColor:
                selectedTheme == "dark"
                  ? colors.light_background
                  : colors.white,
            },
          ]}
        >
          <Image
            source={images.back}
            tintColor={
              selectedTheme == "dark" ? colors.white : colors.blackColor
            }
            resizeMode="contain"
            style={{ height: scale(15), width: scale(20) }}
          />
          <TextComp
            text={"Back"}
            style={{
              paddingLeft: scale(10),
              fontSize: textScale(10),
              fontWeight: "500",
              fontFamily: fonts.NunitoMedium,
            }}
          />
        </TouchableOpacity>
        <Image
          source={{
            uri: data?.flags?.png,
          }}
          style={{
            height: verticalScale(180),
            width: "100%", 
            
            marginTop: verticalScale(40),
          }}
        />
        <TextComp
          text={data?.name?.common}
          style={{
            fontSize: textScale(15),
            fontWeight: "700",
            marginTop: verticalScale(35),
          }}
        />
        <TextComp
          text="Native Name : "
          numberOfLines={1}
          style={styles.boldText}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: textScale(11),
              fontWeight: "400",
              color:
                selectedTheme == "dark"
                  ? colors.white_light
                  : colors.light_background,
              marginTop: verticalScale(9),
            }}
          >
            {Object.values(data?.name?.nativeName)[0]?.official}
          </Text>
        </TextComp>
        <TextComp text="Population : " style={styles.boldText1}>
          <Text
            style={{
              fontSize: textScale(11),
              fontWeight: "400",
              color:
                selectedTheme == "dark"
                  ? colors.white_light
                  : colors.light_background,
              marginTop: verticalScale(9),
            }}
          >
            {data?.population}
          </Text>
        </TextComp>
        <TextComp text="Region : " style={styles.boldText1}>
          <Text
            style={{
              fontSize: textScale(11),
              fontWeight: "400",
              color:
                selectedTheme == "dark"
                  ? colors.white_light
                  : colors.light_background,
              marginTop: verticalScale(9),
            }}
          >
            {data?.region}
          </Text>
        </TextComp>
        <TextComp text="Sub Region : " style={styles.boldText1}>
          <Text
            style={{
              fontSize: textScale(11),
              fontWeight: "400",
              color:
                selectedTheme == "dark"
                  ? colors.white_light
                  : colors.light_background,
              marginTop: verticalScale(9),
            }}
          >
            {data?.subregion}
          </Text>
        </TextComp>
        <TextComp text="Capital : " style={styles.boldText1}>
          <Text
            style={{
              fontSize: textScale(11),
              fontWeight: "400",
              color:
                selectedTheme == "dark"
                  ? colors.white_light
                  : colors.light_background,
              marginTop: verticalScale(9),
            }}
          >
            {data?.capital}
          </Text>
        </TextComp>
        <TextComp text="Top level Domain : " style={styles.boldText2}>
          <Text
            style={{
              fontSize: textScale(11),
              fontWeight: "400",
              color:
                selectedTheme == "dark"
                  ? colors.white_light
                  : colors.light_background,
              marginTop: verticalScale(9),
            }}
          >
            {data?.tld}
          </Text>
        </TextComp>
        <TextComp text="Currency : " style={styles.boldText1}>
          <Text
            style={{
              fontSize: textScale(11),
              fontWeight: "400",
              color:
                selectedTheme == "dark"
                  ? colors.white_light
                  : colors.light_background,
              marginTop: verticalScale(9),
            }}
          >
            {Object.values(data?.currencies)[0]?.name}
          </Text>
        </TextComp>
        <TextComp text="Languages : " style={styles.boldText1}>
          <Text
            style={{
              fontSize: textScale(11),
              fontWeight: "400",
              color:
                selectedTheme == "dark"
                  ? colors.white_light
                  : colors.light_background,
              marginTop: verticalScale(9),
            }}
          >
            {Object.values(data?.languages).map((lan) => `${lan} `)}
            {/* {data?.currencies?.currencyCode?.name} */}
          </Text>
        </TextComp>
        <TextComp text="Border Countries : " style={styles.boldText2} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: verticalScale(20),
            shadowColor: "#171717",
            shadowOffset: { width: -2, height: 1 },
            shadowOpacity: 0.15,
            shadowRadius: 3,
          }}
        >
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {Array.isArray(data?.borders) &&
              data?.borders.length > 0 &&
              data.borders.map((res, i) => (
                <View
                  key={`borders${i}`}
                  style={{
                    height: verticalScale(30),
                    width: scale(110),
                    marginRight: 10,
                    backgroundColor:
                      selectedTheme == "dark"
                        ? colors.light_background
                        : colors.white,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color:
                        selectedTheme == "dark"
                          ? colors.white
                          : colors.blackColor,
                      fontWeight: "500",
                    }}
                  >
                    {res}
                  </Text>
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default CountryDetail;

const styles = StyleSheet.create({
  headerView: {
    height: verticalScale(50),
    width: "100%",
    backgroundColor: "#2e3742",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(10),
    justifyContent: "space-between",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  backButton: {
    flexDirection: "row",
    // justifyContent:'center',
    alignItems: "center",
    paddingHorizontal: scale(15),
    height: scale(30),
    backgroundColor: colors.light_background,
    marginTop: verticalScale(30),
    width: 100,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  boldText: {
    marginTop: verticalScale(15),
    fontWeight: "500",
  },
  boldText1: {
    marginTop: verticalScale(10),
    fontWeight: "500",
  },
  boldText2: {
    marginTop: verticalScale(25),
    fontWeight: "500",
  },
});
