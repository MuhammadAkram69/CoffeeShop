import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import { COLORS, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import EmptyListAnimation from '../components/EmptyListAnimation'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import PaymentFooter from '../components/PaymentFooter'
import CartItem from '../components/CartItem'

interface CartScreenProps {
}

const CartScreen: React.FC<CartScreenProps> = ({ navigation, route }: any) => {
  const CartList = useStore((state: any) => state?.CartList)
  const CartPrice = useStore((state: any) => state?.CartPrice);
  const incrementCartItemQuantity = useStore((state: any) => state.incrementCartItemQuantity);
  const decrementCartItemQuantity = useStore((state: any) => state.decrementCartItemQuantity);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const tabHeight = useBottomTabBarHeight()

  const buttonHandler = () => {
    navigation.push("Payment");
  }
  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewStyle}
      >
        <View style={[styles.ScrollViewInner, { marginBottom: tabHeight }]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title='Cart' />
            {CartList.length == 0 ? <EmptyListAnimation title='Cart is Empty!' />
              : (<View style={styles.ListItemContainer}>
                {CartList.map((data: any) => (
                  <Pressable
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <CartItem
                      id={data?.id}
                      name={data?.name}
                      roasted={data?.roasted}
                      prices={data?.prices}
                      imagelink_square={data?.imagelink_square}
                      special_ingredient={data?.special_ingredient}
                      type={data?.type}
                      incrementCartItemQuantityHandler={incrementCartItemQuantityHandler}
                      decrementCartItemQuantityHandler={decrementCartItemQuantityHandler} />
                  </Pressable>
                ))}
                {
                  CartList?.length != 0 ?
                    <PaymentFooter buttonTitle='Pay' price={{ price: CartPrice, currency: "$" }} buttonPressHandler={buttonHandler} /> : (<></>)
                }

              </View>)}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewStyle: {
    flexGrow: 1,
  },
  ScrollViewInner: {
    flex: 1,
    justifyContent: "space-between"
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },

})

export default CartScreen
