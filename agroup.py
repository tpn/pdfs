import os
import shutil

def main () -> None:
    thisdir = os.getcwd()

    for file in os.listdir(thisdir):
        print("[d]: Data structures & algorithms stuff.")
        print("[l]: Low level stuff")
        print("[o]: Other topics.")
        print("[i]: Intel stuff.")
        print("[m]: Math stuff.")
        print("[n]: Networking stuff.")
        print("[1]: ML/DP/AI stuff.")
        print("[D]: Databases stuff.")


        moveto = input(f"{file}: ")
        if moveto == 'd':
            shutil.move(file, thisdir + "/ds_and_algos")

        if moveto == 'l':
            shutil.move(file, thisdir + "/low_level")

        if moveto == 'o':
            shutil.move(file, thisdir + "/other")

        if moveto == 'i':
            shutil.move(file, thisdir + "/intel")

        if moveto == 'm':
            shutil.move(file, thisdir + "/maths")

        if moveto == 'n':
            shutil.move(file, thisdir + "/networking")

        if moveto == '1':
            shutil.move(file, thisdir + "/ml_dp_ai")

        if moveto == 'D':
            shutil.move(file, thisdir + "/databs")
        os.system("clear")

if __name__ == '__main__':
    main()
