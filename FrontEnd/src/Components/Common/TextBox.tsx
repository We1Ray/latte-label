import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import PublicMethod from "resource/methods/PublicMethod";

interface TextBoxProps {
  visible?: boolean;
  disabled?: boolean;
  maxLength?: number;
  defaultValue?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: React.CSSProperties;
  result?: (value: string) => any | ((value: string) => Promise<any>);
  ref?: React.Ref<any>;
  [x: string]: any;
  callbackRef?: (arg: React.MutableRefObject<any>) => void;
}

export const TextBox: React.FC<TextBoxProps> = forwardRef(
  (
    {
      visible,
      disabled,
      maxLength,
      defaultValue,
      style,
      onFocus,
      onBlur,
      result,
      callbackRef,
      ...props
    },
    forwardedRef
  ) => {
    const [textboxValue, setTextboxValue] = useState(
      PublicMethod.checkValue(defaultValue) ? defaultValue : ""
    );
    const [textboxDisable, setTextboxDisable] = useState(false);
    const [display, setDisplay] = useState(true);
    const [focus, setFocus] = useState(false);
    const [initial, setInitial] = useState(true);
    const textboxRef = useRef(null);

    useImperativeHandle(forwardedRef, () => textboxRef.current);

    useEffect(() => {
      try {
        if (PublicMethod.checkValue(callbackRef)) {
          callbackRef(textboxRef);
        }
      } catch (error) {
        console.log("EROOR: CommonTextBox.useEffect()");
        console.log(error);
      }
    });

    useEffect(() => {
      try {
        if (PublicMethod.checkValue(visible)) {
          setDisplay(visible);
        }
      } catch (error) {
        console.log("EROOR: CommonTextBox.useEffect[visible]");
        console.log(error);
      }
    }, [visible]);

    useEffect(() => {
      try {
        if (!focus && !initial) {
          setTextboxValue(textboxRef.current.value);
        }
        setInitial(false);
      } catch (error) {
        console.log("EROOR: CommonTextBox.useEffect[focus]");
        console.log(error);
      }
    }, [focus]);

    useEffect(() => {
      try {
        checkDisable();
      } catch (error) {
        console.log("EROOR: TextBox.useEffect[disable]");
        console.log(error);
      }
    }, [disabled]);

    /** 判斷欄位是否禁用*/
    function checkDisable() {
      try {
        if (PublicMethod.checkValue(disabled)) {
          setTextboxDisable(disabled);
        } else {
          setTextboxDisable(false);
        }
      } catch (error) {
        console.log("EROOR: CommonTextBox.checkDisable");
        console.log(error);
      }
    }

    useEffect(() => {
      try {
        if (result) {
          result(textboxValue);
        }
      } catch (error) {
        console.log("EROOR: CommonTextBox.useEffect[textboxValue]");
        console.log(error);
      }
    }, [textboxValue]);

    return (
      <>
        {display ? (
          <input
            type={"text"}
            ref={textboxRef}
            className={style ? "" : "form-control input-rounded"}
            disabled={textboxDisable}
            defaultValue={textboxValue}
            style={style}
            maxLength={maxLength}
            onFocus={() => {
              if (onFocus) onFocus();
              setFocus(true);
            }}
            onBlur={() => {
              if (onBlur) onBlur();
              setFocus(false);
            }}
            {...props}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
);
