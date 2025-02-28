import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import SwapTabWrapper from './swaptabwrapper';
import { MdCompareArrows } from 'react-icons/md';
import View from '../view';
import Input from '../input';
import DropDown from '../dropdown';
import Controls from '../controls';
import Text, { InfoText } from '../text';

const DeskTopSwapTabContent = ({
  classes,
  feeAmount,
  minAmount,
  maxAmount,
  inputError,
  baseAmount,
  base,
  currencies,
  quote,
  quoteAmount,
  error,
  errorMessage,
  disabled,
  rate,
  switchPair,
  updateQuoteAmount,
  updateBaseAmount,
  updatePair,
  shouldSubmit,
  baseStep,
  quoteStep,
}) => (
  <View className={classes.wrapper}>
    <View className={classes.stats}>
      <InfoText title="Min amount" text={`${minAmount} ${base}`} />
      <InfoText title="Max amount" text={`${maxAmount} ${base}`} />
      <InfoText title="Fee" text={`${feeAmount} ${base}`} />
      <InfoText title="Rate" text={`${rate}`} />
    </View>
    <View className={classes.options}>
      <View className={classes.select}>
        <Text text="You send:" className={classes.text} />
        <Input
          disable={disabled}
          className={classes.inputMobile}
          min={0}
          max={maxAmount}
          step={quoteStep}
          error={inputError}
          value={baseAmount}
          onChange={updateQuoteAmount}
        />
        <DropDown
          className={classes.inputMobile}
          defaultValue={base}
          fields={currencies}
          onChange={e => updatePair(quote, e)}
        />
      </View>
      <MdCompareArrows className={classes.arrows} onClick={switchPair} />
      <View className={classes.select}>
        <Text text="You receive:" className={classes.text} />
        <Input
          disable={disabled}
          className={classes.inputMobile}
          min={baseStep}
          max={Number.MAX_SAFE_INTEGER}
          step={baseStep}
          error={inputError}
          value={quoteAmount}
          onChange={updateBaseAmount}
        />
        <DropDown
          className={classes.inputMobile}
          defaultValue={quote}
          fields={currencies}
          onChange={e => updatePair(e, base)}
        />
      </View>
    </View>
    <View className={classes.next}>
      <Controls
        text={'Start swap'}
        error={error || inputError}
        onPress={error ? () => {} : () => shouldSubmit()}
        errorText={errorMessage}
      />
    </View>
  </View>
);

const styles = theme => ({
  wrapper: {
    margin: '15px',
    height: '400px',
    width: '600px',
    flexDirection: 'column',
    backgroundColor: theme.colors.white,
    '@media (min-width: 1500px)': {
      width: '800px',
      height: '600px',
    },
    '@media (max-width: 500px)': {
      width: '100%',
      height: '400px',
    },
  },
  inputMobile: {
    '@media (max-width: 500px)': {
      width: '100px',
      fontSize: '16px',
    },
  },
  stats: {
    backgroundColor: theme.colors.white,
    height: '15%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  options: {
    flex: '1 0 70%',
    flexDirection: 'column',
  },
  select: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  next: {
    backgroundColor: theme.colors.matisseBlue,
    flex: '1 0 15%',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  nextError: {
    backgroundColor: theme.colors.tundoraGrey,
    flex: '1 0 15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    color: theme.colors.white,
    fontWeight: '300',
  },
  nextIcon: {
    fontSize: theme.fontSize.sizeXL,
    padding: '10px',
    transition: '0.3s',
    color: theme.colors.white,
    '&:hover': {
      color: theme.colors.lightGrey,
    },
  },
  text: {
    fontSize: '20px',
  },
  arrows: {
    height: '30px',
    width: '30px',
    marginLeft: '80%',
    cursor: 'pointer',
    transform: 'rotate(90deg)',
    transition: 'none 200ms ease-out',
    transitionProperty: 'color',
    color: theme.colors.tundoraGrey,
    '&:hover': {
      color: theme.colors.hoverGrey,
    },
  },
});

DeskTopSwapTabContent.propTypes = {
  classes: PropTypes.object,
  onPress: PropTypes.func,
  fees: PropTypes.object.isRequired,
  limits: PropTypes.object.isRequired,
  currencies: PropTypes.array.isRequired,
  quote: PropTypes.string,
  quoteAmount: PropTypes.number,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  feeAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minAmount: PropTypes.number,
  maxAmount: PropTypes.number,
  inputError: PropTypes.bool,
  baseAmount: PropTypes.number,
  base: PropTypes.string,
  disabled: PropTypes.bool,
  rate: PropTypes.string,
  switchPair: PropTypes.func,
  updateQuoteAmount: PropTypes.func,
  updateBaseAmount: PropTypes.func,
  updatePair: PropTypes.func,
  shouldSubmit: PropTypes.func,
  baseStep: PropTypes.string,
  quoteStep: PropTypes.string,
};

const DeskTopSwapTab = props => (
  <SwapTabWrapper {...props}>
    {p => <DeskTopSwapTabContent {...p} />}
  </SwapTabWrapper>
);

export default injectSheet(styles)(DeskTopSwapTab);
