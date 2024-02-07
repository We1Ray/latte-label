import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Input } from "reactstrap";
import PublicMethod from "resource/methods/PublicMethod";

interface CheckBoxProps {
  visible?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  checkedText: string;
  notCheckedText: string;
  checkedValue: string;
  notCheckedValue: string;
  result?: (
    value: string,
    text: string
  ) => any | ((value: string, text: string) => Promise<any>);
  ref?: React.Ref<any>;
  [x: string]: any;
  callbackRef?: (arg: React.MutableRefObject<any>) => void;
}

export const CheckBox: React.FC<CheckBoxProps> = forwardRef(
  (
    {
      visible,
      disabled,
      defaultValue,
      checkedText,
      notCheckedText,
      checkedValue,
      notCheckedValue,
      result,
      callbackRef,
      ...props
    },
    forwardedRef
  ) => {
    const [checked, setChecked] = useState(
      PublicMethod.checkValue(defaultValue)
        ? defaultValue == checkedValue
        : false
    );
    const [checkboxText, setCheckboxText] = useState(
      PublicMethod.checkValue(defaultValue)
        ? defaultValue == checkedValue
          ? checkedText
          : notCheckedText
        : notCheckedText
    );
    const [checkboxDisable, setCheckboxDisable] = useState(false);
    const [display, setDisplay] = useState(true);
    const checkboxRef = useRef(null);

    useImperativeHandle(forwardedRef, () => checkboxRef.current);

    useEffect(() => {
      try {
        if (PublicMethod.checkValue(callbackRef)) {
          callbackRef(checkboxRef);
        }
      } catch (error) {
        console.log("EROOR: CheckBox.useEffect()");
        console.log(error);
      }
    });

    useEffect(() => {
      try {
        if (PublicMethod.checkValue(defaultValue)) {
          setChecked(
            PublicMethod.checkValue(defaultValue)
              ? defaultValue == checkedValue
              : false
          );

          setCheckboxText(
            PublicMethod.checkValue(defaultValue)
              ? defaultValue == checkedValue
                ? checkedText
                : notCheckedText
              : notCheckedText
          );
        }
      } catch (error) {
        console.log("EROOR: CheckBox.useEffect[defaultValue]");
        console.log(error);
      }
    }, [defaultValue]);

    useEffect(() => {
      try {
        if (PublicMethod.checkValue(visible)) {
          setDisplay(visible);
        }
      } catch (error) {
        console.log("EROOR: CheckBox.useEffect[visible]");
        console.log(error);
      }
    }, [visible]);

    useEffect(() => {
      try {
        setCheckboxText(checked ? checkedText : notCheckedText);
      } catch (error) {
        console.log("EROOR: CheckBox.useEffect[checked]");
        console.log(error);
      }
    }, [checked, notCheckedText, notCheckedValue, checkedValue, checkedText]);

    useEffect(() => {
      try {
        checkDisable();
      } catch (error) {
        console.log("EROOR: CheckBox.useEffect[disable]");
        console.log(error);
      }
    }, [disabled]);

    /** 判斷欄位是否禁用*/
    function checkDisable() {
      try {
        if (PublicMethod.checkValue(disabled)) {
          setCheckboxDisable(disabled);
        } else {
          setCheckboxDisable(false);
        }
      } catch (error) {
        console.log("EROOR: CommonCheckBox.checkDisable");
        console.log(error);
      }
    }

    function handleChange(e) {
      try {
        setChecked(e.target.checked);
        if (result) {
          result(
            e.target.checked ? checkedValue : notCheckedValue,
            e.target.checked ? checkedText : notCheckedText
          );
        }
      } catch (error) {
        console.log("EROOR: CommonCheckBox.handleChange");
        console.log(error);
      }
    }

    return (
      <>
        {display ? (
          <label className="c-checkbox" {...props}>
            <div className="input-group" style={{ padding: "10px 8px" }}>
              <Input
                ref={checkboxRef}
                type="checkbox"
                disabled={checkboxDisable}
                defaultChecked={checked}
                checked={checked}
                onChange={handleChange}
                style={{ padding: "10px 8px" }}
              />
              {PublicMethod.checkValue(checkboxText) ? (
                <>
                  <span className="fa fa-check" />
                  <p>{checkboxText}</p>
                </>
              ) : (
                <></>
              )}
            </div>
          </label>
        ) : (
          <></>
        )}
      </>
    );
  }
);
