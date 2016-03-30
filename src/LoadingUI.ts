//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends egret.Sprite {
    private container:AutoResizeItem
    public constructor() {
        super();
        this.createView();
    }

    private textField:egret.TextField;
    private bar:egret.Shape;
    private createView():void {
        this.container = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO,new egret.Point(400,300), new egret.Point(300,400));
        this.container.changeProps({ x: 400,y: 300 },{x:300,y:400});
        this.addChild(this.container);
        this.bar = new egret.Shape();
        this.bar.x = -150;
        this.bar.y = -5;
        this.container.addChild(this.bar);
        this.textField = new egret.TextField();
        this.container.addChild(this.textField);
        this.textField.y = 20;
        this.textField.width = 100;
        this.textField.height = 50;
        this.textField.textAlign = "center";
    }

    public setProgress(current, total):void {
        
        var p: number = current / total;
        this.textField.text = Math.round(p * 100).toString() + '%';
        this.bar.graphics.clear();
        this.bar.graphics.beginFill(0xffff00);
        this.bar.graphics.drawRoundRect(0,0,300 * p,10,8,8);
        this.bar.graphics.endFill();
    }
}
