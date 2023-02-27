import { useRef, useState } from "react";
import classes from "./Config.module.css";

const Config = () => {
  const [sym, setSym] = useState(false);
  const [dup, setDup] = useState(false);
  const [pass, setPass] = useState("");
  const length = useRef();

  const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  const syms = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "{", "}", "[", "]", ":", "?"]
  const uc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "o", "P", "Q", "R", "S", "T", "U", "V",
          "W", "X", "Y", "Z"]
  const lc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
          "w", "x", "y", "z"]

  //form submit handler
  function submit(event){
    event.preventDefault();
    setPass("");

    let form = {};
    if (length.current.value > 20 || length.current.value < 6) {
      alert("Password must be 6 - 20 charcters long");
    } else {
      form.len = length.current.value;
    }
    form.symbols = sym;
    form.duplicates = dup;

    if (!form.symbols && !form.duplicates) {
      setPass(createNoSymPass(form.len))
    } else if (form.symbols && !form.duplicates) {
      setPass(createFullPass(form.len))
    } else if (!form.symbols && form.duplicates) {
      setPass(createPassNDnoSym(form.len)) 
    } else if (form.symbols && form.duplicates) {
      setPass(createFullPassND(form.len))
    }
  };


  function createNoSymPass(len) {
    let pass = []
    for (let i = 1; i <= len; i++ ) {
        let randChoice = Math.floor(Math.random() * 4)
            if (randChoice === 0) {
                let randNum = Math.floor(Math.random() * nums.length)
                pass.push(nums[randNum])
            } else if (randChoice === 2) {
                let randLc = Math.floor(Math.random() * lc.length)
                pass.push(lc[randLc])
            } else {
                let randUc = Math.floor(Math.random() * uc.length)
                pass.push(uc[randUc])
            }
        }

        let flatPass = pass.join("");
        return flatPass
    };

  function createFullPass(len) {
      let pass = []
  
      for (let i = 1; i <= len; i++ ) {
          let randChoice = Math.floor(Math.random() * 4)
              if (randChoice === 0) {
                  let randNum = Math.floor(Math.random() * nums.length)
                  pass.push(nums[randNum])
              } else if (randChoice === 1) {
                  let randSym = Math.floor(Math.random() * syms.length)
                  pass.push(syms[randSym])
              } else if (randChoice === 2) {
                  let randLc = Math.floor(Math.random() * lc.length)
                  pass.push(lc[randLc])
              } else {
                  let randUc = Math.floor(Math.random() * uc.length)
                  pass.push(uc[randUc])
              }
          }
      let flatPass = pass.join("");
      return flatPass;
  };

  function createPassNDnoSym(len){
    let passSet = new Set()
    let passArr = []

    while(passSet.size < len ) {
        let randChoice = Math.floor(Math.random() * 4)
            if (randChoice === 0) {
                let randNum = Math.floor(Math.random() * nums.length)
                passSet.add(nums[randNum])
            } else if (randChoice === 2) {
                let randLc = Math.floor(Math.random() * lc.length)
                passSet.add(lc[randLc])
            } else {
                let randUc = Math.floor(Math.random() * uc.length)
                passSet.add(uc[randUc])
            }
        }

    passArr = [...passSet]
    let flatPass = passArr.join("");
    return flatPass;
}
  
  function createFullPassND(len){
      let passSet = new Set()
      let passArr = []
  
      while(passSet.size < len ) {
          let randChoice = Math.floor(Math.random() * 4)
              if (randChoice === 0) {
                  let randNum = Math.floor(Math.random() * nums.length)
                  passSet.add(nums[randNum])
              } else if (randChoice === 1) {
                  let randSym = Math.floor(Math.random() * syms.length)
                  passSet.add(syms[randSym])
              } else if (randChoice === 2) {
                  let randLc = Math.floor(Math.random() * lc.length)
                  passSet.add(lc[randLc])
              } else {
                  let randUc = Math.floor(Math.random() * uc.length)
                  passSet.add(uc[randUc])
              }
          }
  
      passArr = [...passSet]
      let flatPass = passArr.join("");
      return flatPass;
  }
  
  //Symbols input handler
  const getSym = (e) => {
    setSym(e.target.checked);
  };

  //Duplicate input handler
  const getDup = (e) => {
    setDup(e.target.checked);
  };

  return (
    <div>
      <div className={classes.config}>
        <h2 className={classes.configHeader}>configuration</h2>
      </div>
      <form className={classes.configStruct}>
        <div className={classes.configAlign}>
          <label htmlFor="length-input">Length (6 - 20 characters)</label>
          <input type="number" id="length-input" ref={length} className={classes.inputWidth} />
        </div>
        <div className={classes.configAlign}>
          <label htmlFor="symbols">Allow symbols (!@#$%^&*+) ?</label>
          <input type="checkbox" id="symbols" onChange={getSym} />
        </div>
        <div className={classes.configAlign}>
          <label htmlFor="dup">Exclude duplicates ?</label>
          <input type="checkbox" id="dup" onChange={getDup} />
        </div>
        <div className={classes.configAlign}>
          <button onClick={submit}>Generate</button>
        </div>
      </form>
        <div className={classes.passContainer}>
          <p>Password:</p>
          <p>{pass}</p>
        </div>
    </div>
  );
};

export default Config;
