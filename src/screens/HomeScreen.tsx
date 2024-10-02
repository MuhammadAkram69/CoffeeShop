import React, { useRef, useState } from 'react'
import { Animated, Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import { StatusBar } from 'react-native'
import HeaderBar from '../components/HeaderBar'
import CustomIcons from '../components/CustomIcons'
import CoffeeCard from '../components/CoffeeCard'


const getCategoriesFromData = (data: any) => {
    let temp: any = {};
    for (let i = 0; i < data?.length; i++) {
        if (temp[data[i].name] == undefined) {
            temp[data[i].name] = 1;
        }
        else {
            temp[data[i].name]++;
        }
    }
    let categories = Object.keys(temp)
    categories.unshift("All");
    return categories;
}

const getCoffeeList = (category: string, data: any) => {
    if (category == "All") {
        return data;
    }
    else {
        let CoffeeList = data?.filter((item: any) => item.name == category)
        return CoffeeList;
    }
}

const HomeScreen = ({ navigation }: any) => {
    const CoffeeList = useStore((state: any) => state?.CoffeeList)
    const BeanList = useStore((state: any) => state?.BeanList)
    const addToCart = useStore((state: any) => state.addToCart);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);


    const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList))
    const [searchText, setSearchText] = useState<any>(undefined)
    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: categories[0],
    })
    const [sortedcoffee, setSortedcoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList))
    const ListRef: any = useRef<FlatList>();
    const tabBarHeight = useBottomTabBarHeight();

    const searchCoffee = (search: string) => {
        if (search != '') {
            ListRef?.current?.scrollToOffset({
                animated: true,
                offset: 0,
            });
            setCategoryIndex({ index: 0, category: categories[0] });
            setSortedcoffee([
                ...CoffeeList.filter((item: any) =>
                    item.name.toLowerCase().includes(search.toLowerCase()),
                ),
            ]);
        }
    };

    const resetSearchCoffee = () => {
        ListRef?.current?.scrollToOffset({
            animated: true,
            offset: 0,
        });
        setCategoryIndex({ index: 0, category: categories[0] });
        setSortedcoffee([...CoffeeList]);
        setSearchText('');
    };

    const CoffeeCardAddToCart = ({
        id,
        index,
        name,
        roasted,
        imagelink_square,
        special_ingredient,
        type,
        prices,
    }: any) => {
        addToCart({
            id,
            index,
            name,
            roasted,
            imagelink_square,
            special_ingredient,
            type,
            prices,
        });
        calculateCartPrice();
        ToastAndroid.showWithGravity(`${name} is Added to Cart `, ToastAndroid.SHORT, ToastAndroid.CENTER)
    };
    return (
        <View style={styles.screenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewFlex}
            >
                {/* App Header */}
                <HeaderBar />
                <Text style={styles.screenTitle}>
                    Find the best {'\n'} coffee for you
                </Text>
                {/* Search Bar */}
                <View style={styles.inputContainer}>
                    <Pressable onPress={() => {
                        searchCoffee(searchText);
                    }}>
                        <CustomIcons
                            style={styles.inputIcon}
                            name='Search'
                            size={FONTSIZE.size_18}
                            color={searchText?.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
                        />
                    </Pressable>
                    <TextInput
                        placeholder='Find your Coffee...'
                        value={searchText}
                        onChangeText={text => {
                            setSearchText(text);
                            searchCoffee(text);
                        }}
                        placeholderTextColor={COLORS.primaryLightGreyHex}
                        style={styles.inputText}
                    />
                    {searchText?.length ? (
                        <Pressable
                            onPress={() => {
                                resetSearchCoffee();
                            }}>
                            <CustomIcons
                                style={styles.inputIcon}
                                name="close"
                                size={FONTSIZE.size_16}
                                color={COLORS.primaryLightGreyHex}
                            />
                        </Pressable>
                    ) : (
                        <></>
                    )}

                </View>
                {/* Categories */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewStyleContainer}
                >
                    {categories?.map((data, index) => (
                        <View
                            key={index.toString()}
                            style={styles.CategoryScrollViewContainer}>
                            <Pressable style={styles.categoryScrollViewItem} onPress={() => {
                                ListRef.current.scrollToOffset({
                                    Animated: true,
                                    offset: 0,
                                })
                                setCategoryIndex({ index: index, category: categories[index] })
                                setSortedcoffee([...getCoffeeList(categories[index], CoffeeList)])
                            }}>
                                <Text
                                    style={[styles.categoryText,
                                    categoryIndex.index == index ? { color: COLORS.primaryOrangeHex } : {},
                                    ]}
                                >
                                    {data}
                                </Text>
                                {categoryIndex.index == index ? (
                                    <View style={styles.ActiveCategory} />
                                ) : (<></>)}
                            </Pressable>
                        </View>

                    ))}

                </ScrollView>
                {/* Coffee Flatlist */}
                <FlatList
                    ref={ListRef}
                    horizontal
                    ListEmptyComponent={
                        <View style={styles.EmptyListContainer}>
                            <Text style={styles.categoryText}> No Coffee Available</Text>
                        </View>
                    }
                    showsHorizontalScrollIndicator={false}
                    data={sortedcoffee}
                    contentContainerStyle={styles.FlatlistContainer}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Pressable onPress={() => {
                                navigation.push("Details", { index: item.index, id: item.id, type: item.type })
                            }}>
                                <CoffeeCard
                                    id={item.id}
                                    index={item.index}
                                    type={item.type}
                                    name={item.name}
                                    rosted={item.roasted}
                                    imagelink_square={item.imagelink_square}
                                    special_ingredient={item.special_ingredient}
                                    average_rating={item.average_rating}
                                    price={item.prices[2]}
                                    buttonPressHandler={CoffeeCardAddToCart}
                                />
                            </Pressable>
                        );
                    }}
                />
                {/* Coffee BeanList */}

                <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>
                <FlatList
                    ref={ListRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={BeanList}
                    contentContainerStyle={[styles.FlatlistContainer, { marginBottom: tabBarHeight }]}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Pressable onPress={() => {
                                navigation.push("Details", { index: item.index, id: item.id, type: item.type })
                            }}>
                                <CoffeeCard
                                    id={item.id}
                                    index={item.index}
                                    type={item.type}
                                    name={item.name}
                                    rosted={item.roasted}
                                    imagelink_square={item.imagelink_square}
                                    special_ingredient={item.special_ingredient}
                                    average_rating={item.average_rating}
                                    price={item.prices[2]}
                                    buttonPressHandler={CoffeeCardAddToCart}
                                />
                            </Pressable>
                        );
                    }}
                />
            </ScrollView >
        </View >
    )
}
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    scrollViewFlex: {
        flexGrow: 1,
    },
    screenTitle: {
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        paddingLeft: SPACING.space_30,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        margin: SPACING.space_30,
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.primaryDarkGreyHex,
        color: COLORS.primaryDarkGreyHex,
    },
    inputIcon: {
        marginHorizontal: SPACING.space_20,
    },
    inputText: {
        height: SPACING.space_20 * 3,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,

    },
    EmptyListContainer: {
        width: Dimensions.get('window').width - SPACING.space_30 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.space_36 * 3.6,
    },
    scrollViewStyleContainer: {
        paddingHorizontal: SPACING.space_20,
        marginBottom: SPACING.space_20,
        flexDirection: "row",
    },
    CategoryScrollViewContainer: {
        paddingHorizontal: SPACING.space_15,
    },
    categoryScrollViewItem: {
        alignItems: "center",
    },
    categoryText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryLightGreyHex,
        marginBottom: SPACING.space_4,
    },
    ActiveCategory: {
        height: SPACING.space_10,
        width: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_10,
        backgroundColor: COLORS.primaryOrangeHex,
    },
    IputIcon: {
        marginHorizontal: SPACING.space_20,
    },
    FlatlistContainer: {
        paddingHorizontal: SPACING.space_20,
        paddingVertical: SPACING.space_20,
        gap: SPACING.space_20,
    },
    CoffeeBeansTitle: {
        fontSize: FONTSIZE.size_18,
        marginLeft: SPACING.space_30,
        marginTop: SPACING.space_20,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
    },
})

export default HomeScreen
