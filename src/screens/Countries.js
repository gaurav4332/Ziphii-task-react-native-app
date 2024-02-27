import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import globalStyles from '../styles/globalStyles';
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from '../styles/responsiveSize';
import images from '../assets';
import SelectDropdown from 'react-native-select-dropdown';
import {FlashList} from '@shopify/flash-list';
import {changeAppTheme} from '../redux/actions/appSettings';
import WrapperContainer from '../container/WrapperContainer';
import {useSelector} from 'react-redux';
import colors from '../styles/colors';
import TextComp from '../components/TextComp';
import fonts from '../assets/fonts';

const continents = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

const Countries = ({navigation}) => {
  const {selectedTheme} = useSelector(state => state?.appSetting);
  // const [selectedItem, setSelectedItem] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [searchArr, setSearchArr] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getCountriesData();
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getCountriesData();
    setRefreshing(false);
  }, []);

  const handleSearch = val => {
    setSearchText(val);
    let arr = [];
    if (val === '') {
      arr = [];
    } else {
      arr = countryData.filter(item =>
        item?.name?.common?.toLowerCase().includes(searchText?.toLowerCase()),
      );
    }
    setSearchArr(arr);
  };

  const onPressTheme = () => {
    if (isDarkTheme) {
      changeAppTheme('light');
    } else {
      changeAppTheme('dark');
    }
    setIsDarkTheme(!isDarkTheme);
  };

  const getCountriesData = async (region = '') => {
    setIsLoading(true);
    try {
      const requestOption = {
        method: 'GET',
        redirect: 'follow',
      };
      const responce = await fetch(
        `https://restcountries.com/v3.1/${region ? 'region/' + region : 'all'}`,
        requestOption,
      );
      const result = await responce.json();
      setIsLoading(false);
      setCountryData(result);
    } catch (error) {
      console.warn('error on geting Data', error);
      setIsLoading(false);
    }
  };

  const renderItem = useCallback(({item, index}) => {
    return (
      <View style={styles.flatView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CountryDetail', {
              data: item,
            });
          }}
          activeOpacity={0.8}
          style={[
            styles.countryContainer,
            {
              backgroundColor:
                selectedTheme == 'dark'
                  ? colors.light_background
                  : colors.white,
            },
          ]}>
          <Image
            source={{
              uri: item?.flags?.png,
            }}
            style={{
              height: verticalScale(120),
              width: '100%',
            }}
            resizeMode="contain"
          />
          <View
            style={{
              height: verticalScale(120),
              width: '100%',
              paddingHorizontal: scale(15),
              paddingVertical: scale(15),
            }}>
            <TextComp
              text={item?.name?.common}
              style={{
                fontSize: textScale(15),
                fontWeight: '700',
              }}
            />
            <TextComp text="Population : " style={styles.boldText}>
              <Text
                style={{
                  fontSize: textScale(11),
                  fontWeight: '400',
                  color:
                    selectedTheme == 'dark'
                      ? colors.white_light
                      : colors.light_background,
                  marginTop: verticalScale(9),
                }}>
                {item?.population}
              </Text>
            </TextComp>
            <TextComp text="Region : " style={styles.boldText1}>
              <Text
                style={{
                  fontSize: textScale(11),
                  fontWeight: '400',
                  color:
                    selectedTheme == 'dark'
                      ? colors.white_light
                      : colors.light_background,
                  marginTop: verticalScale(9),
                }}>
                {item?.region}
              </Text>
            </TextComp>
            <TextComp text="Capital : " style={styles.boldText1}>
              <Text
                style={{
                  fontSize: textScale(11),
                  fontWeight: '400',
                  color:
                    selectedTheme == 'dark'
                      ? colors.white_light
                      : colors.light_background,
                  marginTop: verticalScale(9),
                }}>
                {item?.capital}
              </Text>
            </TextComp>
          </View>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <WrapperContainer>
      <View
        style={[
          styles.headerView,
          {
            backgroundColor:
              selectedTheme == 'dark' ? colors.light_background : colors.white,
          },
        ]}>
        <TextComp
          text="Where in the world?"
          style={{fontFamily: fonts.NunitoBold, fontWeight: '700'}}
        />
        <TouchableOpacity
          onPress={onPressTheme}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={images.moon_fill}
            tintColor={
              selectedTheme == 'dark' ? colors.white : colors.blackColor
            }
            resizeMode="contain"
            style={{height: scale(10), width: scale(10)}}
          />
          <TextComp
            text={selectedTheme == 'dark' ? 'Light Mode' : 'Dark Mode'}
            style={{
              paddingLeft: scale(10),
              fontSize: textScale(10),
              fontWeight: '500',
              fontFamily: fonts.NunitoMedium,
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          // backgroundColor: 'cyan',
          width: '100%',
          height: verticalScale(80),
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: scale(12),
        }}>
        <View
          style={[
            styles.serchView,
            {
              backgroundColor:
                selectedTheme == 'dark'
                  ? colors.light_background
                  : colors.white,
            },
          ]}>
          <Image
            source={images.search}
            tintColor={
              selectedTheme == 'dark' ? colors.white : colors.blackColor
            }
            resizeMode="contain"
            style={{
              height: scale(25),
              width: scale(25),
              paddingHorizontal: scale(25),
            }}
          />
          <TextInput
            style={{
              height: verticalScale(45),
              width: '86%',
              paddingHorizontal: scale(10),
              color: selectedTheme == 'dark' ? colors.white : colors.blackColor,
            }}
            placeholder="Search for a country..."
            placeholderTextColor={
              selectedTheme == 'dark' ? colors.white : colors.blackColor
            }
            onChangeText={txt => {
              handleSearch(txt);
            }}
          />
        </View>
      </View>
      <View style={styles.dropdownContainerStyle}>
        <SelectDropdown
          dropdownStyle={{
            backgroundColor:
              selectedTheme == 'dark' ? colors.light_background : colors.white,
          }}
          renderDropdownIcon={isOpened => {
            return (
              <Image
                source={isOpened ? images.up : images.down}
                resizeMode="contain"
                color={'#444'}
                style={{height: scale(20), width: scale(20)}}
                tintColor={
                  selectedTheme == 'dark' ? colors.white : colors.blackColor
                }
              />
            );
          }}
          rowTextStyle={{
            color: selectedTheme == 'dark' ? colors.white : colors.blackColor,
          }}
          buttonStyle={{
            backgroundColor:
              selectedTheme == 'dark' ? colors.light_background : colors.white,
            shadowColor: '#171717',
            shadowOffset: {width: -2, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 3,
          }}
          buttonTextStyle={{
            color: selectedTheme == 'dark' ? colors.white : colors.blackColor,
          }}
          defaultButtonText={'Filter by Region'}
          data={continents}
          onSelect={(selectedItem, index) => {
            getCountriesData(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem; // Text to display after item is selected
          }}
          rowTextForSelection={(item, index) => {
            return item; // Text to display for each item
          }}
        />
      </View>
      <View style={styles.flatContainer}>
        {!isLoading ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            s
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={searchText.length > 0 ? searchArr : countryData}
            renderItem={renderItem}
            ItemSeparatorComponent={() => (
              <View style={{height: moderateScale(10)}} />
            )}
            estimatedItemSize={200}
          />
        ) : (
          <ActivityIndicator
            size="large"
            color={selectedTheme == 'dark' ? colors.white : colors.blackColor}
          />
        )}
      </View>
    </WrapperContainer>
  );
};

export default Countries;

const styles = StyleSheet.create({
  flatContainer: {
    flex: 1,
    paddingVertical: verticalScale(20),
    paddingBottom: verticalScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatView: {
    paddingHorizontal: moderateScale(40),
    paddingVertical: verticalScale(5),
    width: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  headerView: {
    height: verticalScale(50),
    width: '100%',
    backgroundColor: '#2e3742',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    justifyContent: 'space-between',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  serchView: {
    height: verticalScale(50),
    backgroundColor: '#2e3742',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dropdownContainerStyle: {
    // backgroundColor: 'cyan',
    width: '100%',
    height: verticalScale(60),
    justifyContent: 'center',
    paddingHorizontal: scale(13),
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  countryContainer: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    width: '100%',
  },
  boldText: {
    marginTop: verticalScale(10),
    fontWeight: '500',
  },
  boldText1: {
    marginTop: verticalScale(5),
    fontWeight: '500',
  },
  lightText: {
    fontSize: textScale(11),
    fontWeight: '400',
    color: '#ffffff90',
    marginTop: verticalScale(9),
  },
});
