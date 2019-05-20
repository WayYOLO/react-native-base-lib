import React, { Component } from 'react';

import { StyleSheet, View, Image, TextInput, I18nManager,Text,Alert } from 'react-native';

import PropTypes from 'prop-types';
import _ from 'lodash';

const emialIcon = require('email.png');
const mobileIcon = require('mobile.png');
const certIcon = require('id.png');

const leftIcons = {
  email: emialIcon,
  mobile: mobileIcon,
  cert: certIcon,
};

const rtlTextAlign = I18nManager.isRTL ? 'right' : 'left';
const alert = Alert.alert;
class Input extends Component {
  static propTypes = {
    required: PropTypes.bool, // 是否必填
    iconName: PropTypes.string, // 左侧图标('email','mobile'等)
    phonePrefix: PropTypes.bool, // 号码前缀，输入时加0显示
    emptyTip: PropTypes.string, // 非空校验提示
    regTip: PropTypes.string, // 正则校验提示
    reg: PropTypes.string, // 正则校验表达式
    netVerify: PropTypes.func, // 后台数据校验
    afterTextChange: PropTypes.func, // 输入框变化之后的处理
    initValue: PropTypes.string, // 输入框初始值
  };

  static defaultProps = {
    required: false, // 是否必填
    iconName: '', // 左侧图标('email','mobile'等)
    phonePrefix: '', // 号码前缀，输入时加0显示
    emptyTip: '', // 非空校验提示
    regTip: '', // 正则校验提示
    reg: '', // 正则校验表达式
    netVerify: null, // 后台数据校验
    afterTextChange: null, // 输入框变化之后的处理
    initValue: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      input: props.initValue,
    };
  }

  getText() {
    const { input } = this.state;
    return input;
  }

  onBlur = () => {
    const { emptyTip, regTip, reg, netVerify } = this.props;
    const { input } = this.state;
    if (emptyTip) {
      // 非空校验
      if (_.isEmpty(input)) {
        alert(emptyTip);
      } else {
        // 正则校验
        if (reg) {
          if (!reg.test(input)) {
            alert(regTip);
            return;
          }
        }
        // 后台校验
        if (netVerify) {
          netVerify();
        }
      }
    } else if (!_.isEmpty(input)) {
      // 非空情况下进行正则校验（只有正则校验）
      if (reg) {
        if (!reg.test(input)) {
          alert(regTip);
          return;
        }
      }
      // 后台校验
      if (netVerify) {
        netVerify();
      }
    }
  };

  inputView = () => {
    const { iconName, phonePrefix, hintText, afterTextChange, value, ...props } = this.props;
    const { input } = this.state;
    return (
      <View style={[styles.container]}>
        {iconName ? <Image style={{ marginEnd: 5 }} source={leftIcons[iconName]} /> : null}

        {input && phonePrefix ? <Text style={{ color: '#D8D8D8' }}>{phonePrefix}</Text> : null}

        <TextInput
          {...props} // 继承原控件属性
          ref={c => {
            this.c = c;
          }}
          autoCapitalize="none"
          value={value || input}
          placeholder={hintText}
          placeholderTextColor="#D8D8D8"
          style={styles.textInput}
          onChangeText={text => {
            if (!value) {
              this.setState({ input: text });
              if (afterTextChange) afterTextChange();
            }
          }}
          onBlur={this.onBlur}
        />
      </View>
    );
  };

  isEmpty() {
    const { input } = this.state;
    return _.isEmpty(input);
  }

  /**
   * 前台预校验
   * @returns {boolean}
   */
  empty() {
    const { emptyTip, regTip, reg } = this.props;
    const { input } = this.state;
    // 非空校验
    if (_.isEmpty(input)) {
      alert(emptyTip);
      this.focus();
      return true;
    }
    // 正则校验
    if (reg) {
      if (!reg.test(input)) {
        alert(regTip);
        this.focus();
        return true;
      }
    }
    // TODO:暂时保留后台校验的权利
    // // 后台校验
    // if (netVerify) {
    //   netVerify();
    // }

    return false;
  }

  clearText() {
    this.setState({ input: '' });
  }

  focus() {
    this.c.focus();
  }

  render() {
    const { style } = this.props;
    return (
      <View style={[styles.border, style]}>
        <this.inputView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    // width: 使用时设置
    height: 40,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 5,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    padding: 0,
    textAlign: rtlTextAlign,
  },
  downPickerText: {
    color: '#333333',
    textAlign: 'left',
  },
});
export default Input;
